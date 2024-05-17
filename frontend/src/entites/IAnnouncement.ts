export interface IAnnouncementData {
  announcementInfo: string
  title: string
  date: string
  type: string
  url: string
}

export enum AnnoucementStatus {
  PROGRESS = 'PROGRESS',
  FINISHED = 'FINISHED'
}

export interface IAnnouncementEntity extends IAnnouncementData {}
