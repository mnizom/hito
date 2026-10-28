// 웹 푸시(아이폰 홈 화면·브라우저). FCM 이 보낸 {notification, data} 를 그대로 띄운다.
// 아이폰은 받은 푸시마다 알림을 꼭 띄워야 한다 (안 띄우면 구독이 끊긴다)
self.addEventListener("push", e => {
  const d = e.data ? e.data.json() : {};
  const n = d.notification || {};
  e.waitUntil(self.registration.showNotification(n.title || "HiTo", {
    body: n.body || "", icon: "icon-192.png", badge: "icon-192.png", tag: d.data?.tag,
  }));
});
self.addEventListener("notificationclick", e => {
  e.notification.close();
  e.waitUntil(clients.matchAll({ type: "window", includeUncontrolled: true }).then(ws =>
    ws.length ? ws[0].focus() : clients.openWindow(self.registration.scope)));
});
