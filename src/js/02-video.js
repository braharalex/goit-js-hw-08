import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframePlayer = document.querySelector('#vimeo-player');
const player = new Player(iframePlayer);

if (localStorage.getItem('videoplayer-current-time')) {
  player.setCurrentTime(localStorage.getItem('videoplayer-current-time'));
}

player.on('timeupdate', throttle(writeTimeToStorage, 1000));

function writeTimeToStorage({ seconds }) {
  localStorage.setItem('videoplayer-current-time', seconds);
}
