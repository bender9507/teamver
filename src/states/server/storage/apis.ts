import { supabase } from "../config";

export const uploadProfileImages = async ({ file, name }: { file: File; name: string }) => {
  const { data, error } = await supabase.storage.from("profileImages").upload(name, file);

  if (error) throw error;

  const { data: uploadedUrl } = supabase.storage.from("profileImages").getPublicUrl(data.path);

  return uploadedUrl;
};
