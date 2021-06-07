// const express = require("express");
const socket = io();

const btnSend = document.querySelector("#form button");
const input = document.querySelector("#input");
const ul = document.querySelector("#messages");
const chatContainer = document.querySelector(".chat-container");
const btnSaveNick = document.querySelector('#save-nickname');
const overlay = document.querySelector('.overlay');
const inputNickname = document.querySelector('#nickname-input');

let user = {
  id: Math.random().toString().slice(2),
  nickname: '',
}

btnSaveNick.addEventListener('click', (e) => {
  e.preventDefault();
  if (inputNickname.value.trim().length < 2) {
    alert('tell me ur nickname bro')
    return
  }
  user.nickname = inputNickname.value;
  socket.emit('user', user);
  overlay.classList.add('hidden');
})

btnSend.addEventListener("click", (e) => {
  e.preventDefault();

  if (input.value) {
    socket.emit("chat message", input.value);

    ul.insertAdjacentHTML("beforeend", `<li><b>${user.nickname}:</b> ${input.value}</li>`);

    input.value = "";
  }
});

socket.on("chat message", (msg) => {
  ul.insertAdjacentHTML("beforeend", `<li>${msg}</li>`);
  window.scrollIntoView(ul.lastElementChild);
});
