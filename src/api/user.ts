import { ref, reactive } from '@vue/composition-api'

export interface UserRequest {
  account: string;
  password: string;
  [i: string]: string;
}

interface UserData {
  account: string;
}

export const isLogin = ref(false)
export const userData = reactive<UserData>({ account: '' })
// If User delete card or alter card without correct UserData.
// It should be banned.

function fakeAPI<T> (data: T): Promise<T> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data)
    }, 1000)
  })
}

export async function login (data: UserRequest): Promise<boolean> {
  try {
    const ok = await fakeAPI(true)
    if (!ok) {
      return false
    }
    userData.account = data.account
    isLogin.value = true
    return ok
  } catch (error) {
    return false
  }
}

export async function logout (): Promise<boolean> {
  // -> API -> clean cookie -> isLogin to false
  try {
    const ok = await fakeAPI(true)
    if (!ok) {
      console.log('plz checkout LOFN')
    }
    // cleanCookie()
    isLogin.value = false
    return ok
  } catch (error) {
    return false
  }
}

export async function register (data: UserData): Promise<boolean> {
  try {
    return await fakeAPI(true)
  } catch (error) {
    return false
  }
}

// function radomPromise(): Promise<boolean> {
//   const x = Math.floor(Math.random() * 11);
//   console.log('random number', x);
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       if (x > 5) {
//         resolve(true);
//       } else if (x > 2) {
//         resolve(false);
//       } else {
//         reject(new Error('401'));
//       }
//     }, 1000);
//   });
// }
