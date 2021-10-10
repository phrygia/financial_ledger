import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { HiOutlineTrash } from 'react-icons/hi';
import { CgUserRemove } from 'react-icons/cg';
import { store } from '../../App';
import style from '../../assets/css/header.module.css';
import Modal from './Modal';

function Header() {
    const [modalOpen, setModalOpen] = useState(false);
    const [state, dispatch] = useContext(store);
    const history = useHistory();

    console.log(state);

    const openModal = () => {
        setModalOpen(true);
    };
    const closeModal = () => {
        setModalOpen(false);
    };
    const confirm = () => {
        localStorage.removeItem('userName');
        dispatch({ type: 'SET_USER_NAME', user_name: null });
        setModalOpen(false);
        // history.push('/user');
    };
    const userEdit = () => {
        history.push('/user');
    };

    return (
        <header className={`${style.header}`}>
            <h1>Money book</h1>
            <button onClick={openModal}>
                {state.user_name && <HiOutlineTrash />}
            </button>
            {state.user_name && (
                <Modal
                    open={modalOpen}
                    confirm={confirm}
                    close={closeModal}
                    edit={userEdit}
                    icon={CgUserRemove}
                    header={`${state.user_name} 사용자 삭제`}
                    agree="삭제하기"
                    editText="수정하기"
                >
                    삭제버튼을 누르시면 사용자의 전체 기록 및 <br />
                    정보가 삭제되고 복구 할 수 없습니다.
                </Modal>
            )}
        </header>
    );
}

export default Header;
