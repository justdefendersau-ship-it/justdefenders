/* =====================================================
   JustDefenders ©
   Safe API Runtime
===================================================== */

export async function safeFetch(

  url:string,

  options?:RequestInit
){

  try {

    const response =
    await fetch(

      url,
      options
    )

    if(!response.ok){

      throw new Error(

        `HTTP ${response.status}`
      )
    }

    return await response.json()
  }
  catch(error){

    console.error(
      "API ERROR:",
      error
    )

    return null
  }
}
