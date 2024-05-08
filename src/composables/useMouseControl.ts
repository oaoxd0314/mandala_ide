import { ref } from 'vue';

/**
 * 控制滑鼠行為的 composable
 * 
 * @function locate 來取得滑鼠的位置
 * @function handleMousedown 來處理滑鼠按下的事件
 * @function handleMouseMove 來處理滑鼠移動的事件
 * @function handleMouseUp 來處理滑鼠放開的事件
 */
export const useMouseControl = () => {
  const drag = ref(false)
  const locate = ref({ x: 0, y: 0 })

  function handleMousedown(e: MouseEvent) {
    setupMouseControlEventsInWindow();
    drag.value = true
  }

  function handleMouseMove(e: MouseEvent) {
    if (!drag.value) {
      return;
    }

    locate.value.x = e.clientX
    locate.value.y = e.clientY
  }

  function handleMouseUp(e: MouseEvent) {
    if (!drag.value) {
      return;
    }

    removeMouseControlEventsFromWindow();
    locate.value.x = e.clientX
    locate.value.y = e.clientY
    drag.value = false
  }

  /**
   * 在 window 註冊滑鼠控制所需的事件
   * 
   * @description
   * 使用者在開始拖拉後，游標很容易移出這個元件的範圍，所以要
   * - 在整個視窗上面繼續計算游標移動的位置
   * - 同時避免使用者選取到其他元素
   */
  const setupMouseControlEventsInWindow = () => {
    removeMouseControlEventsFromWindow();

    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mousemove', handleMouseMove);
    document.body.classList.add('disable-user-select');
  }

  /**
   * 移除註冊在 window 的相關滑鼠控制事件
   */
  const removeMouseControlEventsFromWindow = () => {
    window.removeEventListener('mouseup', handleMouseUp);
    window.removeEventListener('mousemove', handleMouseMove);
    document.body.classList.remove('disable-user-select');
  }

  return {
    handleMousedown,
    handleMouseMove,
    handleMouseUp,
    locate
  }
}
