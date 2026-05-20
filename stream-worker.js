// =====================================================
// JustDefenders ©
// Background worker to simulate streaming processing
// =====================================================

setInterval(async () => {
  try {
    await fetch("http://localhost:8081/api/stream/aggregate")
  } catch(e) {}
}, 2000)
