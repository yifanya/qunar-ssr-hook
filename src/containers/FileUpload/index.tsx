import  * as React from "react";
import * as s from './index.m.less';

const { useEffect, useState, useRef, useCallback } = React;

interface IFilesDragAndDropProps {
  onUpload: (files: FileList) => void
  children?: React.ReactNode
  count?: number,
  formats?: string[]
}
interface MessageState {
  show: boolean
  text: string
  type: uploadStatus
}

type uploadStatus = 'success' | 'error' | null;

const FilesDragAndDrop: React.SFC<IFilesDragAndDropProps> = props => {
  const [dragging, setDragging] = useState(false);
  const [message, setMessage] = useState<MessageState>({ show: false, text: "", type: null });
  const { formats, count, onUpload } = props;

  const drop = useRef() as React.MutableRefObject<HTMLDivElement>;

  const showMessage = (text: string, type: uploadStatus, timeout: number) => {
    setMessage({ show: true, text, type})
    setTimeout(() =>
      setMessage({ show: false, text: "", type: null }), timeout);
  };

  const handleDragOver = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);
  const handleDrop = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
    const files = e.dataTransfer && [].slice.call(e.dataTransfer.files);

    if (count && count < files.length) {
      showMessage(`抱歉，每次最多只能上传${count} 文件。`, 'error', 5000);
      return;
    }

    if (formats && files.some((file: File) => !formats.some((format) => file.name.toLowerCase().endsWith(format.toLowerCase())))) {
      showMessage(`只允许上传 ${formats.join(', ')}格式的文件`, 'error', 5000);
      return;
    }

    if (files && files.length) {
      showMessage('成功上传！', 'success', 5000);
      onUpload(files)
    }
  }, []);
  const handleDragEnter = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  }, []);
  const handleDragLeave = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
  }, []);

  useEffect(() => {
    drop.current.addEventListener('dragover', handleDragOver, false);
    drop.current.addEventListener('drop', handleDrop, false);
    drop.current.addEventListener('dragenter', handleDragEnter, false);
    drop.current.addEventListener('dragleave', handleDragLeave, false);
    return () => {
      drop.current.removeEventListener('dragover', handleDragOver);
      drop.current.removeEventListener('drop', handleDrop);
      drop.current.removeEventListener('dragenter', handleDragEnter);
      drop.current.removeEventListener('dragleave', handleDragLeave);
    }
  })


  return (
    <div
      className={[s['FilesDragAndDrop'], s['FilesDragAndDrop__area']].join(' ')}
      ref={drop}
    >
      {message.show && (
          <div
            className={[
              s['FilesDragAndDrop__placeholder'],
              s[`FilesDragAndDrop__placeholder--${message.type}`]
            ].join(' ')}
          >
              {message.text}
              <span
                  role='img'
                  aria-label='emoji'
                  className={s['area__icon']}
              >
                  {message.type === 'error' ? <>&#128546;</> : <>&#128536;</>}
              </span>
          </div>
      )}
      {dragging && (
        <div className={s['FilesDragAndDrop__placeholder']} >
          请放手
          <span
            role='img'
            aria-label='emoji'
            className={s['area__icon']}
          >
            &#128541;
          </span>
        </div>
      )}
    </div>
  );
}

export default FilesDragAndDrop;

// <div class="FilesDragAndDrop__area_cfriD">
//   <div class="FilesDragAndDrop__placeholder_2ZwSh FilesDragAndDrop__placeholder--success__LT8v">
//     成功上传！
//     <span role="img" aria-label="emoji" class="area__icon_33XI6"></span>
//   </div>
// </div>