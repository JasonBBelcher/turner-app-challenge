export interface ITitle {
  Awards: [{AwardWon: boolean, AwardYear: number, Participants?: string[], Award: string, AwardCompany: string}];
  Genres: [string];
  OtherNames: [{TitleNameLanguage: string, TitleNameType: string, TitlenameSortable: string, TitleName: string}];
  Participants: [{IsKey: true, RoleType: string, IsOnScreen: boolean, ParticipantType: string, Name: string, ParticipantId: number}];
  ReleaseYear: number;
  Storylines: [{Description: string, Language: string, Type: string}];
  TitleId: number;
  TitleName: string;
  TitleNameSortable: string;
  _id: string;
}
