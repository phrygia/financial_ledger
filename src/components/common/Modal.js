import React from 'react';
import { IoMdClose } from 'react-icons/io';
import style from '../../assets/css/modal.module.css';

const Modal = (props) => {
    // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
    const { open, close, header, confirm, agree, editText, edit } = props;
    const Icon = props.icon;

    return (
        // 모달이 열릴때 openModal 클래스가 생성된다.
        <div
            className={
                open ? `${style.openModal} ${style.modal}` : `${style.modal}`
            }
        >
            {open ? (
                <section>
                    <div className={style.header}>
                        <button onClick={close}>
                            <IoMdClose />
                        </button>
                        <Icon color="#009bfa" />
                        <h1>{header}</h1>
                        <p>{props.children}</p>
                    </div>
                    <div className={style.btn}>
                        <button onClick={confirm}>{agree}</button>
                        <button onClick={edit}>{editText}</button>
                        {/* <button className="close" onClick={close}>
                            취소하기
                        </button> */}
                    </div>
                </section>
            ) : null}
        </div>
    );
};
export default Modal;
