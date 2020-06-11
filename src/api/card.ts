export interface CardData {
  type: string;
  company: string;
  location: string[];
  webName: string;
  webLink: string;
  contact: string;
  items: string[];
  quality: string;
  context: string;
  belongsTo: string;
  id?: number;
  // [i: string]: string[] | string | number;
}
export type reasonIDs = string[]
export interface Query {
  page: number;
}

function fakeAPI<T> (data: T): Promise<T> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data)
    }, 1000)
  })
}

// 檢舉
async function reportCard (id: number, reasonID: string, detail?: string): Promise<boolean> {
  try {
    return await fakeAPI(true)
  } catch (error) {
    return false
  }
}

// 貼文
export async function postCard (card: CardData): Promise<boolean> {
  try {
    if (card.belongsTo === '') {
      return false
    }
    return await fakeAPI(true)
  } catch (error) {
    return false
  }
}

function checkIDExist (card: CardData): boolean {
  return !!card.id
}
// 編輯貼文
async function updateCard (card: CardData): Promise<boolean> {
  if (!checkIDExist(card)) {
    return false
  }
  try {
    return await fakeAPI(true)
  } catch (error) {
    return false
  }
}

// 刪除貼文
async function deleteCard (id: number): Promise<boolean> {
  try {
    return await fakeAPI(true)
  } catch (error) {
    return false
  }
}

// 取得貼文
export async function fetchCards (query: Query): Promise<CardData[] | false> {
  const fakeData: CardData[] = [
    {
      id: 123,
      type: '製作女裝服飾製作Facebook、 instagram、商城等 BN',
      company: '公司已歇業（現在屬於個人接案agent）',
      location: ['雙北', '台中', '未標注地點'],
      webName: '104外包網，外包平台',
      webLink: '#',
      contact: '凃炳《AKNENNA》',
      items: ['ev31', 'ev32'],
      quality: 'sdfsdfsdfs',
      context: 'qweqwe',
      belongsTo: 'test@gmail.com'
    }
  ]
  try {
    const data = await fakeAPI(fakeData)
    if (!data) {
      return false
    }
    return data
  } catch (error) {
    return false
  }
}
