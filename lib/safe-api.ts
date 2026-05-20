/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\lib\safe-api.ts
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

      return {

        success:false,

        error:
        "HTTP_ERROR",

        status:
        response.status,

        data:null
      }
    }

    const text =
    await response.text()

    if(!text){

      return {

        success:true,

        data:null
      }
    }

    try {

      const json =
      JSON.parse(text)

      return {

        success:true,

        data:json
      }

    } catch {

      return {

        success:false,

        error:
        "INVALID_JSON",

        raw:text
      }
    }

  } catch(error:any){

    return {

      success:false,

      error:
      error.message ||
      "FETCH_FAILURE"
    }
  }
}
