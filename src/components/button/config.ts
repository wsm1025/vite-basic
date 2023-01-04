export default {
  style: {
    width: '100px',
    height: '100px',
    zIndex: 1,
    opacity: 1,
    color: 'red',
  },
  id: 'button-acc',
  innerText: '按钮',
  events: {
    onClick: () => {
      console.log(1);
    },
  },
};
