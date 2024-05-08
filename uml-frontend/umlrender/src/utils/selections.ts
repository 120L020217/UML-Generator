import { Pen } from '@meta2d/core';
import { reactive } from 'vue';

export enum SelectionMode {
  File,
  Pen,
}

const selections = reactive<{
  mode: SelectionMode;
  pen?: Pen;
}>({
  // 选中对象类型：0 - 画布；1 - 单个图元
  mode: SelectionMode.File,
  pen: undefined,
});

// 创建一个响应式对象，包含 (selections:选中对象的类型和对象本身) (select:选中对象的方法)
export const useSelection = () => {
  const select = (pens?: Pen[]) => {
    if (!pens || pens.length !== 1) {
      selections.mode = SelectionMode.File;
      selections.pen = undefined;
      return;
    }

    selections.mode = SelectionMode.Pen;
    selections.pen = pens[0];
  };
  return {
    selections,
    select,
  };
};
