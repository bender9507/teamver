# 🦫TEAMVER

개발자를 위한 프로젝트 팀원 매칭 서비스

2023.08.16-2023.09.15

### 🧑🏻‍💻 팀원

| 전해강 | 제준영 | 임수빈 | 양현서 | 김소정   |
| ------ | ------ | ------ | ------ | -------- |
| `리더` | 부리더 | 팀원   | 팀원   | 디자이너 |

### 🌈 프로젝트 소개

**TEAMVER**

좋은 프로젝트 아이디어가 떠올랐는데,, 같이 협업할 사람을 구하기 어려우신가요?!

"TEAMVER"에서 나와 내 프로젝트에 딱 맞는 동료를 찾아보세요!

> 개발 공부를 하는 학생이나 취준생, 사이드 프로젝트를 하려는 현업자를 대상으로 좀 더 "가볍게" 사람들과 팀을 이루고 프로젝트를 진행할 수 있는 서비스입니다.

> 카드 스와이프 방식으로 마음에 드는 동료나 프로젝트는 오른쪽으로 찜! 아쉬우면 왼쪽으로 pass! 필요한 정보를 재밌게 탐색해보세요.

### 📍 배포 주소

https://www.teamver.kr

### 📱 MVP 기능

1. 회원가입 및 유저 정보 관리
2. 스와이프 방식을 통한 유저 및 프로젝트 탐색 후 북마크
3. 북마크한 유저에게 채팅요청 후 매칭 성사
4. 채팅을 통한 소통 후 프로젝트 초대
5. 다국어 기능 지원

### 🎬 시연영상

시연 영상은 [여기](https://youtu.be/eVxusmxg6hw)에서 확인할 수 있습니다. 

![시연영상 썸네일](https://github.com/jeonhaekang/teamver/assets/130683029/6965fbbd-df1f-40d5-88c9-8a37db68fc8d)

### 🧩 기술스택

<img src="https://img.shields.io/badge/html-E34F26?style=for-the-badge&logo=html5&logoColor=white"><img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"><img src="https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=next.js&logoColor=white"><img src="https://img.shields.io/badge/reactquery-FF4154?style=for-the-badge&logo=reactquery&logoColor=white"><img src="https://img.shields.io/badge/zustand-764ABC?style=for-the-badge&logo=&logoColor=white"><img src="https://img.shields.io/badge/emotion-DB7093?style=for-the-badge&logo=emotion&logoColor=white"><img src="https://img.shields.io/badge/supabase-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white"><img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">

### 🏗️ Project Structure

![스크린샷 2023-09-14 오후 8 53 43](https://github.com/jeonhaekang/teamver/assets/130683029/02a40a08-be38-49c2-a7bb-e223651273d8)

### 📑 API Table

<details>
<summary>API Table 표 펼쳐보기</summary>

| API 이름                                                                                                                                                                                                                                                                                      | 분류     | 함수명                       | Method   | Request                                                                                                                                                                                                                                       | Response                                                                                                                                                                                                                                                                                                 |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ---------------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 상수 데이터                                                                                                                                                                                                                                                                                   | Constant | selectConstants              | `Select` | tables: [ ”areas”, ”jobs”, “languages”,“personalities”, “projectTypes”, “positions”, “reactions”, “skills” ]                                                                                                                                  | { areas: ConstantAreaTable, …. }                                                                                                                                                                                                                                                                         |
| 유저 프로필 생성                                                                                                                                                                                                                                                                              | Profile  | insertProfile                | `Insert` | { name: string, introduce: string, imageUrl: string, languages: ProfileLanguageInsert[], skills: ProfileSkillIId[], areas: [], jobs: ProfileJobId[], projectTypes: ProfileProjectTypeId[], personalities: ProfilePersonalityId[] }            |                                                                                                                                                                                                                                                                                                          |
| 유저 프로필 상세                                                                                                                                                                                                                                                                              | Profile  | selectProfile                | `Select` | userId                                                                                                                                                                                                                                        | { id: string, imagUrl: string, name: string, introduce: string, github: string, createdAt: Date, skills: profileSkillRow[], projectTypes: profileProjectTypeRow[], positions: profilePositionRow[], personalities: [], languages: profileLanguageRow[], jobs: profileJobRow[], areas: profileAreaRow[] } |
| 유저 프로필 수정                                                                                                                                                                                                                                                                              | Profile  | updateProfile                | `Update` | { profile?: ProfileInsert, languages?: rofileLanguageInsert[], skills?: ProfileSkillInsert[], areas?: ProfileAreaInsert[], jobs?: ProfileJobInsert[], projectTypes?: ProfilePRojectTypeInsert[], personalities?: ProfilePersonalityInsert[] } |                                                                                                                                                                                                                                                                                                          |
| 사용자 찜                                                                                                                                                                                                                                                                                     | Profile  | insertFollow                 | `Insert` | { myId: string, opponentId: string }                                                                                                                                                                                                          |                                                                                                                                                                                                                                                                                                          |
| 내가 찜한 사용자                                                                                                                                                                                                                                                                              | Profile  | selectFollows                | `Select` | myId: string                                                                                                                                                                                                                                  | profileAllDataRow[]                                                                                                                                                                                                                                                                                      |
| 찜한 사용자 삭제                                                                                                                                                                                                                                                                              | Profile  | deleteFollow                 | `Delete` | followId: string                                                                                                                                                                                                                              |                                                                                                                                                                                                                                                                                                          |
| 이름 중복검사                                                                                                                                                                                                                                                                                 | Profile  | checkNameValidation          | `Select` | nickname: string                                                                                                                                                                                                                              | { blog: string `or` null, createdAt: string, github: string, id: string, imageUrl: string, introduce: string, job: number, name: string, role: number }                                                                                                                                                  |
| 사용자 추천                                                                                                                                                                                                                                                                                   | Profile  | selectRecommendedProfiles    | `Select` | { skills: ConstantSkillRow["id"][], languages: ConstantLanguageRow["id"][], positions: ConstantPositionRow["id"][], areas: ConstantAreaRow["id"][], seedValue: number, userId: string, pageParam?: number, limit?: number }                   | projectAllDataRow[]                                                                                                                                                                                                                                                                                      |
| 참가 모드 변경                                                                                                                                                                                                                                                                                | Profile  | updateRole                   | `Update` | { id: string, role: number }                                                                                                                                                                                                                  |                                                                                                                                                                                                                                                                                                          |
| 프로젝트 상세                                                                                                                                                                                                                                                                                 | Project  | selectProject                | `Select` | projectId: string                                                                                                                                                                                                                             | { id: string, ownerId:string, name: string, description: string, imageUrl: string, recruitCount: text, startDate: Date, endDate: Date, state: ProjectState, types: ProjectTypeRow[], skills: ProjectSkillRow[], positions: ProjectPositionRow[], members: Profile[], languages: ProjectLanguagesRow[] }  |
| 프로젝트 생성                                                                                                                                                                                                                                                                                 | Project  | insertProject                | `Insert` | { ownerId: string, project: ProjectInsert, types: ProjectTypesId[], positions: ProjectPositionId[], languages: ProjectLanguageId[], skills: ProjectSkillId[], members: ProjectMemberId[] }                                                    |                                                                                                                                                                                                                                                                                                          |
| 프로젝트 수정                                                                                                                                                                                                                                                                                 | Project  | updateProject                | `Update` | { project?: ProjectInsert, types?: ProjectTypesInsert[], positions?: ProjectPositionInsert[], languages?: ProjectLanguageInsert[], skills?: ProjectSkillInsert[], members?: ProjectMemberInsert[] }                                           |                                                                                                                                                                                                                                                                                                          |
| 프로젝트 삭제                                                                                                                                                                                                                                                                                 | Project  | deleteProject                | `Delete` | projectId: string                                                                                                                                                                                                                             |                                                                                                                                                                                                                                                                                                          |
| 내 프로젝트 목록 (오너)                                                                                                                                                                                                                                                                       | Project  | selectOwnerProjects          | `Select` | myId: string                                                                                                                                                                                                                                  | projectAllDataRow[]                                                                                                                                                                                                                                                                                      |
| 내 프로젝트 목록 (참가자)                                                                                                                                                                                                                                                                     | Project  | selectMemberProjects         | `Select` | myId: string                                                                                                                                                                                                                                  | projectAllDataRow[]                                                                                                                                                                                                                                                                                      |
| 프로젝트 초대                                                                                                                                                                                                                                                                                 | Project  | insertProjectInvite          | `Insert` | { projectId: string, requesterId: string, receiverId: string }                                                                                                                                                                                |                                                                                                                                                                                                                                                                                                          |
| 프로젝트 초대 상태 변경                                                                                                                                                                                                                                                                       | Project  | updateProjectInviteState     | `Update` | { id: string, state: invite_state }                                                                                                                                                                                                           |                                                                                                                                                                                                                                                                                                          |
| 초대된 프로젝트 목록                                                                                                                                                                                                                                                                          | Project  | selectProjectInvites         | `Select` | receiverId: string                                                                                                                                                                                                                            |                                                                                                                                                                                                                                                                                                          |
| 프로젝트 찜                                                                                                                                                                                                                                                                                   | Project  | insertFollowProject          | `Insert` | { followerId: string, projectId: string }                                                                                                                                                                                                     |                                                                                                                                                                                                                                                                                                          |
| 내가 찜한 프로젝트 목록                                                                                                                                                                                                                                                                       | Project  | selectFollowProjects         | `Select` | myId: string                                                                                                                                                                                                                                  | { id: number, project: projectAllDataRow }[]                                                                                                                                                                                                                                                             |
| 프로젝트에 멤버 추가                                                                                                                                                                                                                                                                          | Project  | insertMemberToProject        | `Insert` | projectMembersInsertData: ProjectMembersInsert                                                                                                                                                                                                |                                                                                                                                                                                                                                                                                                          |
| 프로젝트에서 멤버 삭제                                                                                                                                                                                                                                                                        | Project  | deleteMemberInProject        | `Delete` | { projectId: number, memberId: string }                                                                                                                                                                                                       |                                                                                                                                                                                                                                                                                                          |
| 프로젝트 찜 삭제                                                                                                                                                                                                                                                                              | Project  | deleteFollowProject          | `Delete` | followProjectId: number                                                                                                                                                                                                                       |                                                                                                                                                                                                                                                                                                          |
| 프로젝트 추천                                                                                                                                                                                                                                                                                 | Project  | selectRecommendedProjects    | `Select` | { seedValue: number, userId: string, areas: ConstantAreaRow["id"][], projectType?: number, pageParam?: number, limit?: number }                                                                                                               | projectAllDataRow[]                                                                                                                                                                                                                                                                                      |
| 프로젝트 모집 상태 변경                                                                                                                                                                                                                                                                       | Project  | updateProjectState           | `Update` | { id: number, state: ProjectDataRow["state"] }                                                                                                                                                                                                |                                                                                                                                                                                                                                                                                                          |
| 채팅 요청 (멤버)                                                                                                                                                                                                                                                                              | Chat     | insertChatRequestMember      | `Insert` | { requesterId: string, receiverId: string }                                                                                                                                                                                                   |                                                                                                                                                                                                                                                                                                          |
| 채팅 요청 (오너)                                                                                                                                                                                                                                                                              | Chat     | insertChatRequestOwner       | `Insert` | { requesterId: string, receiverId: string }                                                                                                                                                                                                   |                                                                                                                                                                                                                                                                                                          |
| 내 채팅 요청 목록 (오너)                                                                                                                                                                                                                                                                      | Chat     | selectChatRequestOwner       | `Select` | { receiverId: string, state: invite_state }                                                                                                                                                                                                   | { id: number, state: invite_state, requesterProfile: profileAllDataRow }[]                                                                                                                                                                                                                               |
| 내 채팅 요청 목록 (멤버)                                                                                                                                                                                                                                                                      | Chat     | selectChatRequestMember      | `Select` | { receiverId: string, state: invite_state }                                                                                                                                                                                                   | { id: number, state: invite_state, requesterProfile: profileAllDataRow }[]                                                                                                                                                                                                                               |
| 채팅 요청 삭제 (멤버)                                                                                                                                                                                                                                                                         | Chat     | deleteChatRequestMember      | `Delete` | id: number                                                                                                                                                                                                                                    |                                                                                                                                                                                                                                                                                                          |
| 채팅 요청 삭제 (오너)                                                                                                                                                                                                                                                                         | Chat     | deleteChatRequestOwner       | `Delete` | id: number                                                                                                                                                                                                                                    |                                                                                                                                                                                                                                                                                                          |
| 채팅 요청 상태 변경 (오너)                                                                                                                                                                                                                                                                    | Chat     | updateChatRequestOwnerState  | `Update` | { id:string, state: invite_state }                                                                                                                                                                                                            |                                                                                                                                                                                                                                                                                                          |
| 채팅 요청 상태 변경 (멤버)                                                                                                                                                                                                                                                                    | Chat     | updateChatRequestMemberState | `Update` | { id:string, state: invite_state }                                                                                                                                                                                                            |                                                                                                                                                                                                                                                                                                          |
| 내 채팅 목록                                                                                                                                                                                                                                                                                  | Chat     | selectChatRoom               | `Select` | { roomId: string, userId: string }                                                                                                                                                                                                            | { id: int, members: profileAllDataRow[], messages: { id: number, message: string, sender: ProfileAllDataRow, createAt: Date }}                                                                                                                                                                           |
| 읽지 않은 메세지 확인                                                                                                                                                                                                                                                                         | Chat     | selectChatRooms              | `Select` | userId: string                                                                                                                                                                                                                                | { id: int, members: profileAllDataRow[], messages: { id: number, message: string, sender: ProfileAllDataRow, createAt: Date }}                                                                                                                                                                           |
| 채팅 메세지 입력하기                                                                                                                                                                                                                                                                          | Chat     | insertChatMessage            | `Insert` | { roomId: string, senderId: string, message: string }                                                                                                                                                                                         |                                                                                                                                                                                                                                                                                                          |
| 채팅 메세지 목록                                                                                                                                                                                                                                                                              | Chat     | selectChatMessages           | `Select` | roomId: number                                                                                                                                                                                                                                | { id: string, senderProfile: profileAllDataRow, message: string, createdAt: Date }[]                                                                                                                                                                                                                     |
| 채팅방에 참여한 유저 삭제                                                                                                                                                                                                                                                                     | Chat     | deleteChatMember             | `Delete` | { userId : string, roomId : number, }                                                                                                                                                                                                         |                                                                                                                                                                                                                                                                                                          |
| 채팅방 생성과 생성된 방에 유저 추가                                                                                                                                                                                                                                                           | Chat     | insertChatRoomWithMember     | `Insert` | { requestId: string, receiverId: string }                                                                                                                                                                                                     |                                                                                                                                                                                                                                                                                                          |
| 채팅창 유저 상태 변경                                                                                                                                                                                                                                                                         | Chat     | updateChatMemberState        | `Update` | { roomId: number, userId: string, state: boolean }                                                                                                                                                                                            |                                                                                                                                                                                                                                                                                                          |
| 채팅 요청 상태 변경 (오너)                                                                                                                                                                                                                                                                    | Chat     | updateChatRequestOwnerState  | `Update` | { id: number, state: "GRANT" `or` "DENIED" }                                                                                                                                                                                                  |                                                                                                                                                                                                                                                                                                          |
| 채팅 요청 상태 변경 (멤버)                                                                                                                                                                                                                                                                    | Chat     | updateChatRequestMemberState | `Update` | { id: number, state: "GRANT" `or` "DENIED" }                                                                                                                                                                                                  |                                                                                                                                                                                                                                                                                                          |
| 마지막 읽은 채팅 업데이트                                                                                                                                                                                                                                                                     | Chat     | updateLastReadMessage        | `Update` | { userId: string, roomId: number, lastReadMessageId: number }                                                                                                                                                                                 |                                                                                                                                                                                                                                                                                                          |
| 메세지 읽음 처리                                                                                                                                                                                                                                                                              | Chat     | updateMessageReadState       | `Update` | { roomId: string, userId: string }                                                                                                                                                                                                            |                                                                                                                                                                                                                                                                                                          |
| 채팅 상대 불러오기                                                                                                                                                                                                                                                                            | Chat     | selectOpponent               | `Select` | { roomId: string, userId: string }                                                                                                                                                                                                            | ProfileAllDataRow                                                                                                                                                                                                                                                                                        |
| 읽지 않은 메세지 불러오기(네비게이션바 표시)                                                                                                                                                                                                                                                  | Chat     | selectUnreadMessageCount     | `Select` | userId: string                                                                                                                                                                                                                                | data: number                                                                                                                                                                                                                                                                                             |
| 레파지토리 목록 불러오기                                                                                                                                                                                                                                                                      | Github   | getRepos                     | `Select` | username: string                                                                                                                                                                                                                              | GithubData[]                                                                                                                                                                                                                                                                                             |
| 레파지토리 1개 불러오기                                                                                                                                                                                                                                                                       | Github   | getRepo                      | `Select` | repoUrl: string                                                                                                                                                                                                                               | GithubData                                                                                                                                                                                                                                                                                               |
| 사용자 찜                                                                                                                                                                                                                                                                                     | Profile  | insertFollow                 | `Insert` | { myId: string, opponentId: string }                                                                                                                                                                                                          |                                                                                                                                                                                                                                                                                                          |
| 내가 찜한 사용자                                                                                                                                                                                                                                                                              | Profile  | selectFollows                | `Select` | myId: string                                                                                                                                                                                                                                  | profileAllDataRow[]                                                                                                                                                                                                                                                                                      |
| 찜한 사용자 삭제                                                                                                                                                                                                                                                                              | Profile  | deleteFollow                 | `Delete` | followId: string                                                                                                                                                                                                                              |                                                                                                                                                                                                                                                                                                          |
| 이름 중복검사                                                                                                                                                                                                                                                                                 | Profile  | checkNameValidation          | `Select` | nickname: string                                                                                                                                                                                                                              | { blog: string `or` null,createdAt: string, github: string, id: string, imageUrl: string, introduce: string, job: number, name: string, role: number }                                                                                                                                                   |
| 사용자 추천                                                                                                                                                                                                                                                                                   | Profile  | selectRecommendedProfiles    | `Select` | { skills: ConstantSkillRow["id"][], languages: ConstantLanguageRow["id"][], positions: ConstantPositionRow["id"][], areas: ConstantAreaRow["id"][], seedValue: number, userId: string, pageParam?: number, limit?: number }                   | projectAllDataRow[]                                                                                                                                                                                                                                                                                      |
| 참가 모드 변경                                                                                                                                                                                                                                                                                | Profile  | updateRole                   | `Update` | { id: string, role: number }                                                                                                                                                                                                                  |                                                                                                                                                                                                                                                                                                          |
| 프로젝트 상세                                                                                                                                                                                                                                                                                 | Project  | selectProject                | `Select` | projectId: string                                                                                                                                                                                                                             | { id: string, ownerId:string, name: string, description: string, imageUrl: string, recruitCount: text, startDate: Date, endDate: Date, state: ProjectState, types: ProjectTypeRow[], skills: ProjectSkillRow[], positions: ProjectPositionRow[], members: Profile[], languages: ProjectLanguagesRow[] }  |
| 프로젝트 생성                                                                                                                                                                                                                                                                                 | Project  | insertProject                | `Insert` | { ownerId: string, project: ProjectInsert, types: ProjectTypesId[], positions: ProjectPositionId[], languages: ProjectLanguageId[], skills: ProjectSkillId[], members: ProjectMemberId[] }                                                    |                                                                                                                                                                                                                                                                                                          |
| 프로젝트 수정                                                                                                                                                                                                                                                                                 | Project  | updateProject                | `Update` | { project?: ProjectInsert, types?: ProjectTypesInsert[], positions?: ProjectPositionInsert[], languages?: ProjectLanguageInsert[], skills?: ProjectSkillInsert[], members?: ProjectMemberInsert[] }                                           |                                                                                                                                                                                                                                                                                                          |
| 프로젝트 삭제                                                                                                                                                                                                                                                                                 | Project  | deleteProject                | `Delete` | projectId: string                                                                                                                                                                                                                             |                                                                                                                                                                                                                                                                                                          |
| 내 프로젝트 목록 (오너)                                                                                                                                                                                                                                                                       | Project  | selectOwnerProjects          | `Select` | myId: string                                                                                                                                                                                                                                  | projectAllDataRow[]                                                                                                                                                                                                                                                                                      |
| 내 프로젝트 목록 (참가자)                                                                                                                                                                                                                                                                     | Project  | selectMemberProjects         | `Select` | myId: string                                                                                                                                                                                                                                  | projectAllDataRow[]                                                                                                                                                                                                                                                                                      |
| 프로젝트 초대                                                                                                                                                                                                                                                                                 | Project  | insertProjectInvite          | `Insert` | { projectId: string, requesterId: string, receiverId: string }                                                                                                                                                                                |                                                                                                                                                                                                                                                                                                          |
| 프로젝트 초대 상태 변경                                                                                                                                                                                                                                                                       | Project  | updateProjectInviteState     | `Update` | { id: string, state: invite_state }                                                                                                                                                                                                           |                                                                                                                                                                                                                                                                                                          |
| 초대된 프로젝트 목록                                                                                                                                                                                                                                                                          | Project  | selectProjectInvites         | `Select` | receiverId: string                                                                                                                                                                                                                            |                                                                                                                                                                                                                                                                                                          |
| 프로젝트 찜                                                                                                                                                                                                                                                                                   | Project  | insertFollowProject          | `Insert` | { followerId: string, projectId: string }                                                                                                                                                                                                     |                                                                                                                                                                                                                                                                                                          |
| 내가 찜한 프로젝트 목록                                                                                                                                                                                                                                                                       | Project  | selectFollowProjects         | `Select` | myId: string                                                                                                                                                                                                                                  | { id: number, project: projectAllDataRow }[]                                                                                                                                                                                                                                                             |
| 프로젝트에 멤버 추가                                                                                                                                                                                                                                                                          | Project  | insertMemberToProject        | `Insert` | projectMembersInsertData: ProjectMembersInsert                                                                                                                                                                                                |                                                                                                                                                                                                                                                                                                          |
| 프로젝트에서 멤버 삭제                                                                                                                                                                                                                                                                        | Project  | deleteMemberInProject        | `Delete` | { projectId: number, memberId: string }                                                                                                                                                                                                       |                                                                                                                                                                                                                                                                                                          |
| 프로젝트 찜 삭제                                                                                                                                                                                                                                                                              | Project  | deleteFollowProject          | `Delete` | followProjectId: number                                                                                                                                                                                                                       |                                                                                                                                                                                                                                                                                                          |
| 프로젝트 추천                                                                                                                                                                                                                                                                                 | Project  | selectRecommendedProjects    | `Select` | { seedValue: number, userId: string, areas: ConstantAreaRow["id"][], projectType?: number, pageParam?: number, limit?: number }                                                                                                               | projectAllDataRow[]                                                                                                                                                                                                                                                                                      |
| 프로젝트 모집 상태 변경                                                                                                                                                                                                                                                                       | Project  | updateProjectState           | `Update` | { id: number, state: ProjectDataRow["state"] }                                                                                                                                                                                                |                                                                                                                                                                                                                                                                                                          |
| 채팅 요청 (멤버)                                                                                                                                                                                                                                                                              | Chat     | insertChatRequestMember      | `Insert` | { requesterId: string, receiverId: string }                                                                                                                                                                                                   |                                                                                                                                                                                                                                                                                                          |
| 채팅 요청 (오너)                                                                                                                                                                                                                                                                              | Chat     | insertChatRequestOwner       | `Insert` | { requesterId: string, receiverId: string }                                                                                                                                                                                                   |                                                                                                                                                                                                                                                                                                          |
| 내 채팅 요청 목록 (오너)                                                                                                                                                                                                                                                                      | Chat     | selectChatRequestOwner       | `Select` | { receiverId: string, state: invite_state }                                                                                                                                                                                                   | { id: number, state: invite_state, requesterProfile: profileAllDataRow }[]                                                                                                                                                                                                                               |
| 내 채팅 요청 목록 (멤버)                                                                                                                                                                                                                                                                      | Chat     | selectChatRequestMember      | `Select` | { receiverId: string, state: invite_state }                                                                                                                                                                                                   | { id: number, state: invite_state, requesterProfile: profileAllDataRow }[]                                                                                                                                                                                                                               |
| 채팅 요청 삭제 (멤버)                                                                                                                                                                                                                                                                         | Chat     | deleteChatRequestMember      | `Delete` | id: number                                                                                                                                                                                                                                    |                                                                                                                                                                                                                                                                                                          |
| 채팅 요청 삭제 (오너)                                                                                                                                                                                                                                                                         | Chat     | deleteChatRequestOwner       | `Delete` | id: number                                                                                                                                                                                                                                    |                                                                                                                                                                                                                                                                                                          |
| 채팅 요청 상태 변경 (오너)                                                                                                                                                                                                                                                                    | Chat     | updateChatRequestOwnerState  | `Update` | { id:string, state: invite_state }                                                                                                                                                                                                            |                                                                                                                                                                                                                                                                                                          |
| 채팅 요청 상태 변경 (멤버)                                                                                                                                                                                                                                                                    | Chat     | updateChatRequestMemberState | `Update` | { id:string, state: invite_state }                                                                                                                                                                                                            |                                                                                                                                                                                                                                                                                                          |
| 내 채팅 목록                                                                                                                                                                                                                                                                                  | Chat     | selectChatRoom               | `Select` | { roomId: string, userId: string }                                                                                                                                                                                                            | { id: int, members: profileAllDataRow[], messages: { id: number, message: string, sender: ProfileAllDataRow, createAt: Date }}                                                                                                                                                                           |
| 읽지 않은 메세지 확인                                                                                                                                                                                                                                                                         | Chat     | selectChatRooms              | `Select` | userId: string                                                                                                                                                                                                                                | { id: int, members: profileAllDataRow[], messages: { id: number, message: string, sender: ProfileAllDataRow, createAt: Date }}                                                                                                                                                                           |
| 채팅 메세지 입력하기                                                                                                                                                                                                                                                                          | Chat     | insertChatMessage            | `Insert` | { roomId: string, senderId: string, message: string }                                                                                                                                                                                         |                                                                                                                                                                                                                                                                                                          |
| 채팅 메세지 목록                                                                                                                                                                                                                                                                              | Chat     | selectChatMessages           | `Select` | roomId: number                                                                                                                                                                                                                                | { id: string, senderProfile: profileAllDataRow, message: string, createdAt: Date }[]                                                                                                                                                                                                                     |
| 채팅방에 참여한 유저 삭제                                                                                                                                                                                                                                                                     | Chat     | deleteChatMember             | `Delete` | { userId : string, roomId : number, }                                                                                                                                                                                                         |                                                                                                                                                                                                                                                                                                          |
| 채팅방 생성과 생성된 방에 유저 추가                                                                                                                                                                                                                                                           | Chat     | insertChatRoomWithMember     | `Insert` | { requestId: string, receiverId: string }                                                                                                                                                                                                     |                                                                                                                                                                                                                                                                                                          |
| 채팅창 유저 상태 변경                                                                                                                                                                                                                                                                         | Chat     | updateChatMemberState        | `Update` | { roomId: number, userId: string, state: boolean }                                                                                                                                                                                            |                                                                                                                                                                                                                                                                                                          |
| 채팅 요청 상태 변경 (오너)                                                                                                                                                                                                                                                                    | Chat     | updateChatRequestOwnerState  | `Update` | { id: number, state: "GRANT" `or` "DENIED" }                                                                                                                                                                                                  |                                                                                                                                                                                                                                                                                                          |
| 채팅 요청 상태 변경 (멤버)                                                                                                                                                                                                                                                                    | Chat     | updateChatRequestMemberState | `Update` | { id: number, state: "GRANT" `or` "DENIED" }                                                                                                                                                                                                  |                                                                                                                                                                                                                                                                                                          |
| 마지막 읽은 채팅 업데이트                                                                                                                                                                                                                                                                     | Chat     | updateLastReadMessage        | `Update` | { userId: string, roomId: number, lastReadMessageId: number }                                                                                                                                                                                 |                                                                                                                                                                                                                                                                                                          |
| 메세지 읽음 처리                                                                                                                                                                                                                                                                              | Chat     | updateMessageReadState       | `Update` | { roomId: string, userId: string }                                                                                                                                                                                                            |                                                                                                                                                                                                                                                                                                          |
| 채팅 상대 불러오기                                                                                                                                                                                                                                                                            | Chat     | selectOpponent               | `Select` | { roomId: string, userId: string }                                                                                                                                                                                                            | ProfileAllDataRow                                                                                                                                                                                                                                                                                        |
| 읽지 않은 메세지 불러오기(네비게이션바 표시) &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | Chat     | selectUnreadMessageCount     | `Select` | userId: string                                                                                                                                                                                                                                | data: number                                                                                                                                                                                                                                                                                             |
| 레파지토리 목록 불러오기                                                                                                                                                                                                                                                                      | Github   | getRepos                     | `Select` | username: string                                                                                                                                                                                                                              | GithubData[]                                                                                                                                                                                                                                                                                             |
| 레파지토리 1개 불러오기                                                                                                                                                                                                                                                                       | Github   | getRepo                      | `Select` | repoUrl: string                                                                                                                                                                                                                               | GithubData                                                                                                                                                                                                                                                                                               |
| 알림 목록 불러오기 (멤버)                                                                                                                                                                                                                                                                     | Notice   | selectNoticeMember           | `Select` | myId: string                                                                                                                                                                                                                                  | NoticeMemberAllDataRow[]                                                                                                                                                                                                                                                                                 |
| 알림 목록 불러오기 (오너)                                                                                                                                                                                                                                                                     | Notice   | selectNoticeOwner            | `Select` | myId: string                                                                                                                                                                                                                                  | NoticeOwnerAllDataRow[]                                                                                                                                                                                                                                                                                  |
| 읽지 않은 알림 (멤버)                                                                                                                                                                                                                                                                         | Notice   | selectNoticeCountMember      | `Select` | myId: string                                                                                                                                                                                                                                  | data: number                                                                                                                                                                                                                                                                                             |
| 읽지 않은 알림 (오너)                                                                                                                                                                                                                                                                         | Notice   | selectNoticeCountOwner       | `Select` | myId: string                                                                                                                                                                                                                                  | data: number                                                                                                                                                                                                                                                                                             |
| 알림 추가 (멤버)                                                                                                                                                                                                                                                                              | Notice   | insertNoticeMember           | `Insert` | {receiverId: string, requesterId: string, state: "ChatRequest" `or` "ChatGranted" `or` "TeamRequest" `or` "TeamGranted”}                                                                                                                      |                                                                                                                                                                                                                                                                                                          |
| 알림 추가 (오너)                                                                                                                                                                                                                                                                              | Notice   | insertNoticeOwner            | `Insert` | {receiverId: string, requesterId: string, state: "ChatRequest" `or` "ChatGranted" `or` "TeamRequest" `or` "TeamGranted”}                                                                                                                      |                                                                                                                                                                                                                                                                                                          |
| 알림 읽음 표시 (멤버)                                                                                                                                                                                                                                                                         | Notice   | updateNoticeMember           | `Update` | id: number                                                                                                                                                                                                                                    |                                                                                                                                                                                                                                                                                                          |
| 알림 읽음 표시 (오너)                                                                                                                                                                                                                                                                         | Notice   | updateNoticeOwner            | `Update` | id: number                                                                                                                                                                                                                                    |                                                                                                                                                                                                                                                                                                          |
| 알림 삭제 (멤버)                                                                                                                                                                                                                                                                              | Notice   | deleteNoticeMember           | `Delete` | id: number                                                                                                                                                                                                                                    |                                                                                                                                                                                                                                                                                                          |
| 알림 삭제 (오너)                                                                                                                                                                                                                                                                              | Notice   | deleteNoticeOwner            | `Delete` | id: number                                                                                                                                                                                                                                    |                                                                                                                                                                                                                                                                                                          |

</details>

### 💫 Trouble Shootings

<details>
<summary>배포환경에서 속도가 느려지는 현상</summary>

`문제`.

Vercel을 통해서 서비스를 배포한 환경에서 접속이 느려지는 현상

npm build, npm start로 실행한 로컬 환경에서는 속도가 정상

---

`시도`.

1.  서버사이드 렌더링에서 prefetch의 속도 측정
    `perfomance.now`를 사용해 prefetch에 소요되는 시간을 계산, 약 `60ms`로 빠르게 이루어지기에 문제없음

    ```tsx
    export const getServerSideProps: GetServerSideProps = requireAuthentication(
      async (context, session) => {
        // 시작 기록
        const start = performance.now();

        const queryClient = new QueryClient();

        await queryClient.prefetchQuery(profileKeys.selectProfile(session.user.id), () =>
          selectProfile(session.user.id)
        );

        // 종료 기록
        const end = performance.now();

        // 기록 계산
        console.log(`${end - start}ms`);

        return {
          props: {
            session,
            ...(await serverSideTranslations(context.locale as string, [
              "common",
              "profile",
              "project"
            ]))
          }
        };
      }
    );
    ```

2.  `@next/bundle-analyzer`를 사용하여 번들 사이즈 측정
    모든 번들이 500kb이하로 문제되는 번들을 발견하지 못함
    <img width="1431" alt="%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2023-09-04_%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB_11 46 37" src="https://github.com/jeonhaekang/teamver/assets/130683029/8abae48e-375d-4859-b6a4-5ae586e1ba1b">

---

`해결`.

Vercel의 위치가 기본값인 워싱턴으로 설정되어 있었음, supabase 서버의 위치는 서울으로 설정되어 있었기에 물리적인 거리가 멀어서 응답이 지연됨

Function Region을 서울로 변경하여 적용
<img width="938" alt="서울" src="https://github.com/jeonhaekang/teamver/assets/130683029/97060e60-74cf-4496-8936-31fe890224d9">

변경전 라이트 하우스 Total Blocking Time이 240ms 였으나
<img width="732" alt="전" src="https://github.com/jeonhaekang/teamver/assets/130683029/06f7cfb5-25eb-44ac-a5d5-40932674432f">

수정 후 Total Blocking Time이 0ms로 크게 개선됨
<img width="679" alt="후" src="https://github.com/jeonhaekang/teamver/assets/130683029/5bf14168-8d49-443b-b86b-18ec9257cf0c">

</details>

<details>
<summary>i18next를 활용한 다국어 구현</summary>

`문제 1`.

JSON 파일을 통해 번역파일을 관리하는 과정에서 협업의 불편함 발생

`해결`.

1. 구글 스프레드 시트를 활용한 번역 데이터 관리 실시간으로 팀원들과 번역본 공유
2. npm script를 통해서 시트를 자동으로 JSON파일로 생성하도록 자동화
   <img width="748" alt="다국어" src="https://github.com/jeonhaekang/teamver/assets/130683029/f7a0ba57-193c-4fce-a17f-ab358cc5e42f">
   npm script를 이용한 번역 json파일 생성 및 구글 스프레드시트 업로드 자동화

---

`문제 2`.

언어를 선택할 때 url에 의존하기 때문에, 언어 변경 후 뒤로가기 버튼 사용 시 다시 이전 언어로 복구되는 현상

`해결`.

middleware를 사용하여 쿠키에 저장한 locale과 이동할 페이지의 locale이 다를시 redirect

```tsx
const PUBLIC_FILE = /\\.(.*)$/;

export const middleware = async (req: NextRequest) => {
  const res = NextResponse.next();

  if (
    req.nextUrl.pathname.startsWith("/_next") ||
    req.nextUrl.pathname.includes("/api/") ||
    PUBLIC_FILE.test(req.nextUrl.pathname)
  ) {
    return;
  }

  const selectedLocale = req.cookies.get("locale")?.value ?? "ko";

  if (req.nextUrl.locale !== selectedLocale) {
    return NextResponse.redirect(
      new URL(`/${selectedLocale}${req.nextUrl.pathname}${req.nextUrl.search}`, req.url)
    );
  }

  return res;
};
```

</details>

<details>
<summary>프로젝트 및 멤버 추천</summary>

모집자에게는 유저를, 참가자에게는 프로젝트를 추천하는 기능

---

`문제`.

프로젝트 및 멤버를 추천하는 과정에서 발생한 문제

1. 추천 항목이 항상 정해진 순서대로 노출되는 문제 발생
2. 랜덤하게 순서를 받을 경우 무한 스크롤 구현 시 같은 요소가 추천되는 문제 발생

`해결`.

Supabase의 SQL을 활용해 순서를 랜덤으로 전달받고, SEED를 활용해 특정 값을 전달, 그 값이 변하지 않으면 다시 랜덤하게 생성되지 않도록 조치

```sql
CREATE
OR REPLACE FUNCTION "select_recommended_members" (
  "seedValue" double precision,
  "userId" uuid,
  "skills" INTEGER[],
  "languages" INTEGER[],
  "positions" INTEGER[],
  "areas" INTEGER[]
) RETURNS SETOF profiles AS $$
BEGIN
    PERFORM SETSEED("seedValue");

    RETURN QUERY
    SELECT
       *
    FROM
        profiles
    WHERE
       // ...table join
		ORDER BY
        RANDOM();
END;
$$ LANGUAGE plpgsql;

```

</details>

<details>
<summary>채팅요청 수락 시 동작에 대한 고민</summary>

채팅 요청 수락을 누르면 채팅방이 하나 생성되고, 그 방에 요청자와 수신자가 포함되어야 한다.

---

`문제`.

```jsx
 export const insertChatRoomWithMember = async ({
   requesterId,
   receiverId
 }: {
   requesterId: string;
   receiverId: string;
 }) => {
   const { data, error }: InsertChatRoomResponse = await supabase
     .from("chatRoom")
     .insert([{ createdAt: new Date() }]);

   if (error) throw new Error("채팅방을 생성하는데 실패했습니다.");

   if (data && "id" in data[0]) {
     const roomId = (data as ChatRoomRow[])[0].id;

     const { error: memberError } = await supabase.from("chatMembers").insert([
       { roomId, userId: receiverId },
       { roomId, userId: requesterId }
     ]);

     if (memberError) throw new Error("채팅멤버를 생성하는데 실패했습니다.");
   }
 };

```

1. 중간에 오류가 발생했을 때 멤버 없는 채팅방이 생성되는 것과 같은 문제가 생길 수 있다.
2. API를 여러번 호출

---

`과정`.

sql을 통해 위 작업을 한번에 수행하는 함수를 생성해 클라이언트에서 호출

```jsx
CREATE OR REPLACE FUNCTION insert_chatroom_with_member(requester_id text, receiver_id text)
RETURNS void AS $$
DECLARE
  new_room_id integer;
BEGIN
  INSERT INTO "chatRooms" ("createdAt") VALUES (NOW())
  RETURNING id INTO new_room_id;

  INSERT INTO "chatMembers" ("roomId", "userId", "createdAt")
  VALUES
    (new_room_id, requester_id::uuid, NOW()),
    (new_room_id, receiver_id::uuid, NOW());

  INSERT INTO "chatReadStatus" ("userId", "roomId")
  VALUES
    (requester_id::uuid, new_room_id),
    (receiver_id::uuid, new_room_id);
END; $$ LANGUAGE plpgsql;

```

---

`해결`.

supabase의 trigger기능을 사용해 chatRequest의 상태가 수락으로 변경되면 자동으로 멤버를 등록하는 sql이 실행되도록 처리

클라이언트에서 호출하지 않아도 서버에서 자동으로 실행

```tsx
CREATE OR REPLACE FUNCTION handle_chat_request_owner() RETURNS TRIGGER AS $$
DECLARE
  new_room_id integer;
BEGIN
  -- chatRequest의 state가 'GRANT'로 변경될 경우
  IF NEW.state = 'GRANT' THEN

    -- 새 chatRoom 생성
    INSERT INTO "chatRooms" ("createdAt") VALUES (NOW())
    RETURNING id INTO new_room_id;

    INSERT INTO "chatMembers" ("userId", "roomId", "createdAt")
    VALUES (NEW."requesterId", new_room_id, NOW()), (NEW."receiverId", new_room_id, NOW());
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER chat_request_owner_trigger
AFTER INSERT OR UPDATE OF state ON "chatRequestOwner"
FOR EACH ROW EXECUTE FUNCTION handle_chat_request_owner();

```

</details>

<details>
<summary>페이지별 세션 관리</summary>

`문제`.

로그인이 되어있지 않은 유저가 사이트에 접근했을 때 인가 문제.

---

`과정`.

서버사이드에서 세션을 검사 후 세션이 없으면 로그인 페이지로 리다이렉트

세션 검사 코드를 매번 입력해야하는 번거로움 발생

```jsx
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const supabaseClient = createPagesServerClient < Database > ctx;

  const {
    data: { session }
  } = await supabaseClient.auth.getSession();

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false
      }
    };
  }

  return {
    props: {
      user: session.user,
      ...(await serverSideTranslations(ctx.locale, ["profile"]))
    }
  };
};
```

---

`해결`.

서버사이드 렌더링시 세션을 검사해주는 함수를 생성

```tsx
// requireSessionProps
type GSSPWrapper = (
  context: GetServerSidePropsContext,
  session: Session
) => Promise<GetServerSidePropsResult<{ session: Session }>>;

export const requireAuthentication = (gssp: GSSPWrapper): GetServerSideProps => {
  return async (
    context: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<{ session: Session }>> => {
    const supabase = createPagesServerClient<Database>(context);

    const {
      data: { session }
    } = await supabase.auth.getSession();

    if (!session) {
      return {
        redirect: {
          destination: "/",
          statusCode: 302
        }
      };
    }

    const response = await gssp(context, session);

    return response;
  };
};
```

해당 함수를 사용하여 로그인한 유저만 접근할 수 있도록 처리

```tsx
// index.page.tsx
export const getServerSideProps: GetServerSideProps = requireAuthentication(
  async (context, session) => {
    return {
      props: {
        session,
        ...(await serverSideTranslations(context.locale as string, ["common", "chat"]))
      }
    };
  }
);
```

</details>

<details>
<summary>사용자 미접속 시 알림을 받을 수 없음</summary>

`문제`.

알림을 받는 사용자 쪽에서 특정 테이블에 변화가 일어나면 알림 테이블에 데이터를 추가하는 방식으로 로직을 짰지만, 그러면 해당 사용자가 접속하지 않은 상태에서는 알림을 전혀 받을수 없게 됨

```jsx
import { useUser } from "@supabase/auth-helpers-react";
import type { User } from "@supabase/supabase-js";
import { useQueryClient } from "@tanstack/react-query";

export const Notifications = () => {
  const user = useUser() as User;
  const queryClient = useQueryClient();

  useMount(() => {
    if (!user.id) return;

    const notice = supabase
      .channel("notice")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "chatRequestMember",
          filter: `receiverId=eq.${user.id}`
        },
        () => {
          queryClient.invalidateQueries(noticeKeys.selectNoticeOwner(user.id));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(notice);
    };
  });

  return <></>;
};
```

`해결`.

알림을 받는 주체가 아닌, 알림을 보내는 사용자 측에서 특정 테이블에 변화를 일으킬 때 알림 테이블에 추가해 주는 방식으로 로직을 변경해 문제 해결.

```jsx
const { mutate: insertNoticeOwnerMutate } = useInsertNoticeOwner();

const { mutate: insertChatRequestMemberMutate } = useInsertChatRequestsMemberMutate({
  onSuccess: () => {
    queryClient.invalidateQueries(projectsKey.selectFollowProjects(userId));

    insertNoticeOwnerMutate({
      receiverId: data.project.ownerId,
      requesterId: userId,
      state: "ChatRequest"
    });

    toast({ type: "success", message: t("채팅을 성공적으로 요청했습니다") });
  },

  onError: () => {
    toast({ type: "error", message: t("채팅 요청을 실패했습니다") });
  }
});
```

</details>

### 👂🏻 UT 피드백 반영

<details>
<summary>사용 방법에 대한 안내 부족</summary>

`문제`.

유저 테스트 결과 의외로 어떻게 사용하는지 모르겠다는 의견이 많았다.

![스크린샷 2023-09-14 오후 10 03 53](https://github.com/jeonhaekang/teamver/assets/130683029/d11408a9-7f66-4d57-bd28-317fc85a0a69)

`해결`.

가입 직후에 진입하는 첫 화면에서 사용 안내에 대한 온보딩 화면을 제작하여

어플에 대한 기본적인 기능을 소개하는 단계를 추가하였음.
![온보딩](https://github.com/jeonhaekang/teamver/assets/130683029/e5801bc8-9a60-48e7-88bd-3ac98d451c00)

</details>

<details>
<summary>PWA 설치 안내</summary>

![스크린샷 2023-09-17 오후 5 14 52](https://github.com/jeonhaekang/teamver/assets/130683029/dcbe2136-5ada-4942-a831-befc204eca8f)

pwa가 적용되어 있었는지도 몰랐다는 의견을 반영 하여

inApp 설치 버튼을 만들어 설치 안내 (아이폰은 홈화면으로 꺼내기 방법을 설명)

<img width="436" alt="Untitled" src="https://github.com/jeonhaekang/teamver/assets/130683029/a2e65b8f-ffe9-4cb4-b6d1-072aeb339f6d">

좌측은 안드로이드, 우측은 IOS

</datails>
