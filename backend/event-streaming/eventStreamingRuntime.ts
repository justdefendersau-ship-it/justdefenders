export async function streamEvent(
  topic?: any,
  payload?: any
) {

  return {

    streamed: true,

    topic,

    payload
  }
}
