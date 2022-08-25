export interface userData extends userDataInput {
  id: number
}

export interface userDataInput {
	username: string,
	password: string
}

export interface userDataOutput {
  message?: string,
  success: boolean,
  token?: string
}