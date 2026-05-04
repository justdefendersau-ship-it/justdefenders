// =====================================================
// JustDefenders ©
// File: public/sw.js
// Purpose: Handle browser push notifications
// =====================================================

self.addEventListener("push", function(event){

  const data = event.data ? event.data.json() : {
    title: "JustDefenders",
    body: "New notification"
  }

  self.registration.showNotification(data.title, {
    body: data.body,
    icon: "/icon.png"
  })

})