import { reactive } from '@vue/composition-api'
import { i18n } from '../boot/i18n'

// 資料來源格式
interface ConfigResponseData {
  exposeForm: {
    typeList: string[];
    locationList: string[];
    evList: string[];
  };
}

type TypeList = string[];
type LocationList = { label: string; value: string }[];
type EvList = { label: string; value: string }[][];

export interface ExposeForm {
  typeList: TypeList;
  locationList: LocationList;
  // 0: ev1 List, 1: ev2 List, 3: evList
  evList: EvList;
}
// 整理後的格式

interface Config {
  exposeForm: ExposeForm;
}

function fakeAPI<T> (data: T): Promise<T> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data)
    }, 1000)
  })
}

function typeListHandler (typeList: string[]): {typeList: TypeList} {
  return { typeList }
}

function locationListHandler (list: string[]): {locationList: LocationList} {
  const locationList = list.map(value => ({ label: (i18n.t(value) as string), value }))
  return { locationList }
}

export function evListHandler (list: string[]): {evList: EvList} {
  const regexp = new RegExp(/^ev([\d]){1}/, 'i')
  const evList: EvList = []
  list.sort()
  for (const value of list) {
    const mch = regexp.exec(value)
    if (mch) {
      const key = Number(mch[1]) - 1
      const content = { label: (i18n.t(value) as string), value }
      if (evList[key]) {
        evList[key].push(content)
      } else {
        evList[key] = [content]
      }
    }
  }
  return { evList }
}

export const config = (reactive({}) as Config)

/*
  由於後端送來的資料跟前端不同，所以要經過"變質"處理
  並採用初始化翻譯，交給 Handler 處理
  為何？ 因為使用者思想是在一開始的時候才會去變語言！
    初始化翻譯： 資料進來的時候翻譯。體驗是倒吃甘蔗
    即時翻譯： 網站呈現的時候才翻譯。一開始進程快，需要翻譯的地方慢
*/
function configMiddleware ({ exposeForm }: ConfigResponseData): void {
  config.exposeForm = {
    ...typeListHandler(exposeForm.typeList),
    ...locationListHandler(exposeForm.locationList),
    ...evListHandler(exposeForm.evList)
  }
}

export async function fetchConfig (): Promise<boolean> {
  const fakeData = {
    exposeForm: {
      typeList: ['taipei', 'taichung'],
      locationList: ['網拍', '排隊工'],
      evList: ['ev12', 'ev23', 'ev24', 'ev31']
    }
  }
  try {
    // TODO AJAX
    const data = await fakeAPI(fakeData)
    if (!data) { return false }

    configMiddleware(data)

    return true
  } catch (error) {
    return false
  }
}

// function radomPromise(): Promise<ConfigResponseData | false> {
//   const x = Math.floor(Math.random() * 11);
//   console.log('config random number', x);
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       if (x > 5) {
//         resolve({
//           exposeForm: {
//             typeList: ['taipei', 'taichung'],
//             locationList: ['網拍', '排隊工'],
//             evList: ['ev12', 'ev23', 'ev24', 'ev31']
//           }
//         });
//       } else if (x > 2) {
//         resolve(false);
//       } else {
//         reject(new Error('401'));
//       }
//     }, 1000);
//   });
// }
