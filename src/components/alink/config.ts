export default {
  style: {
    width: '100px',
    height: '100px',
    zIndex: 1,
    opacity: 1,
    color: 'red',
    display: 'block',
    fontSize: '20px',
  },
  id: 'button-acc',
  info: {
    target: '_blank',
    href: 'https://www.baidu.com',
  },
  innerText: '按钮',
  events: {
    onclick: () => {
      console.log(1);
    },
  },
};
