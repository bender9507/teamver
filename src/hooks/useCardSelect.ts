import { useTranslation } from "next-i18next";
import { useCallback, useState } from "react";
import { useDialog } from "~/components/Commons";

export const useCardSelect = <T extends { id: string | number }>(
  cards: T[],
  onAccept?: (id: string | number) => void,
  onReject?: (id: string | number) => void
) => {
  const { t } = useTranslation("chat");

  const [selectedCards, setSelectedCards] = useState<Map<string, boolean>>(new Map());
  const [rejectedCards, setRejectedCards] = useState<(string | number)[]>([]);

  const { toast } = useDialog();

  const addSelectedCards = (id: string | number) => {
    setSelectedCards((prevCards) => {
      const _prevProfiles = new Map(prevCards);
      _prevProfiles.set(String(id), true);

      return _prevProfiles;
    });
  };

  const handleAccept = useCallback(
    (id: string | number) => {
      addSelectedCards(id);

      if (onAccept) onAccept(id);
    },
    [onAccept]
  );

  const handleReject = useCallback(
    (id: string | number) => {
      addSelectedCards(id);
      setRejectedCards((prev) => [...prev, id]);

      if (onReject) onReject(id);
    },
    [onReject]
  );

  const handleRestore = useCallback(() => {
    if (!rejectedCards.length) {
      toast({ type: "warning", message: t("더 이상 복원할 수 없습니다.") });
    }

    setRejectedCards((rejectedCards) => {
      const rejectedCard = rejectedCards.pop();

      setSelectedCards((selectedCards) => {
        const _selectedCards = new Map(selectedCards);
        _selectedCards.delete(String(rejectedCard));

        return _selectedCards;
      });

      return rejectedCards;
    });
  }, [rejectedCards.length, t, toast]);

  const filteredCards = cards.filter((card) => !selectedCards.has(String(card.id))).reverse();

  return {
    handleAccept,
    handleReject,
    handleRestore,
    filteredCards
  };
};
