import { ref } from 'vue';

/**
 * 控制滑鼠行為的 composable
 * 
 * @function locate 來取得滑鼠的位置
 * @function handleMousedown 來處理滑鼠按下的事件
 * @function handleMouseMove 來處理滑鼠移動的事件
 * @function handleMouseUp 來處理滑鼠放開的事件
 */
export const useMouseDrag = () => {
  /**
   * 是否正在拖拉
   */
  const drag = ref(false);
  /**
   * 滑鼠相對於 Drag Element 的位置
   */
  const relativeMouseLocate = ref({ x: 0, y: 0 });
  /**
   * Drag Element 的位置
   */
  const locate = ref({ x: 0, y: 0 });

  function setInitLocate(top: number, left: number) {
    locate.value.x = left;
    locate.value.y = top;
  }

  /**
   * 處理滑鼠按下的事件
   * 
   * @param e MouseEvent
   * @param dragElement number
   */
  function handleMousedown(e: MouseEvent, dragElement: HTMLElement | null) {
    // only left click can drag
    if (e.button !== 0) {
      return;
    }

    setupMouseControlEventsInWindow();
    drag.value = true;

    if (dragElement) {
      const rect = dragElement.getBoundingClientRect();
      // 計算滑鼠相對於 Drag Element 的位置，以便於拖拉時不會讓 Drag Element 跳動
      relativeMouseLocate.value = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    }
  }

  function handleMouseMove(e: MouseEvent) {
    if (!drag.value) {
      return;
    }
    locate.value.x = e.clientX - relativeMouseLocate.value.x;
    locate.value.y = e.clientY - relativeMouseLocate.value.y;
  }

  function handleMouseUp() {
    if (!drag.value) {
      return;
    }

    removeMouseControlEventsFromWindow();
    drag.value = false;
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
  };

  /**
   * 移除註冊在 window 的相關滑鼠控制事件
   */
  const removeMouseControlEventsFromWindow = () => {
    window.removeEventListener('mouseup', handleMouseUp);
    window.removeEventListener('mousemove', handleMouseMove);
    document.body.classList.remove('disable-user-select');
  };

  return {
    setInitLocate,
    handleMousedown,
    handleMouseMove,
    handleMouseUp,
    locate
  };
};
