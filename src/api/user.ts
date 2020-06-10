import { ref } from '@vue/composition-api'

export const isLogin = ref(false)

function radomPromise (): Promise<boolean> {
  const x = Math.floor(Math.random() * 11)
  console.log('random number', x)
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (x > 5) {
        resolve(true)
      } else if (x > 2) {
        resolve(false)
      } else {
        reject(new Error('401'))
      }
    }, 1000)
  })
}

export async function login (): Promise<boolean> {
  try {
    const ok = await radomPromise()
    if (ok) {
      isLogin.value = true
    }
    return ok
  } catch (error) {
    return false
  }
}

export async function logout (): Promise<boolean> {
  try {
    const ok = await radomPromise()
    if (ok) {
      isLogin.value = false
    }
    return ok
  } catch (error) {
    return false
  }
}

export async function register (): Promise<boolean> {
  try {
    const ok = await radomPromise()
    return ok
  } catch (error) {
    return false
  }
}
