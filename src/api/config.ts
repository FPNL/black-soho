import { reactive } from '@vue/composition-api'
import { TypicalFormList, TypicalSelectInputList } from 'src/components/sidebar/model'
import { i18n } from '../boot/i18n'
export interface Config {
  exposeForm: {
    typeList: TypicalSelectInputList;
    locationList: TypicalFormList;
    evList: {
      ev1: TypicalFormList;
      ev2: TypicalFormList;
      ev3: TypicalFormList;
    };
  };
}

export const config = (reactive({ exposeForm: {} }) as Config)

interface ResponseData {
  typeList: TypicalSelectInputList;
  locationList: TypicalSelectInputList;
  evList: TypicalSelectInputList;
}

export interface EVForm {
  ev1: TypicalFormList;
  ev2: TypicalFormList;
  ev3: TypicalFormList;
  [i: string]: TypicalFormList;
}

function radomPromise (): Promise<ResponseData | false> {
  const x = Math.floor(Math.random() * 11)
  console.log('config random number', x)
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (x > 5) {
        resolve({
          typeList: ['taipei', 'taichung'],
          locationList: ['網拍', '排隊工'],
          evList: ['ev12', 'ev23', 'ev24', 'ev31']
        })
      } else if (x > 2) {
        resolve(false)
      } else {
        reject(new Error('401'))
      }
    }, 1000)
  })
}

function typeListHandler (list: string[]): TypicalSelectInputList {
  return list
}

function locationListHandler (list: string[]): TypicalFormList {
  return list.map(value => ({ label: (i18n.t(value) as string), value }))
}

function evListHandler (list: string[]): EVForm {
  const regexp = new RegExp(/ev[\d]{1}/, 'i')
  const statsContent: EVForm = { ev1: [], ev2: [], ev3: [] }
  list.sort()
  list.map(value => {
    const mch = regexp.exec(value)
    if (mch) {
      const key = mch[0]
      if (statsContent[key]) {
        statsContent[key] = [...statsContent[key], { label: (i18n.t(value) as string), value }]
      } else {
        statsContent[key] = [{ label: (i18n.t(value) as string), value }]
      }
    }
  })
  return statsContent
}

export async function fetchConfig (): Promise<boolean> {
  try {
    // TODO AJAX
    const data = await radomPromise()
    if (!data) {
      return false
    }
    config.exposeForm = {
      typeList: typeListHandler(data.typeList),
      locationList: locationListHandler(data.locationList),
      evList: evListHandler(data.evList)
    }
    return true
  } catch (error) {
    return false
  }
}
