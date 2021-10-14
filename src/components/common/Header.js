import React, { useState, useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { IoArrowBack } from 'react-icons/io5';
import { FiGrid } from 'react-icons/fi';
import { HiOutlineTrash } from 'react-icons/hi';
import { CgUserAdd, CgUserRemove } from 'react-icons/cg';
import { store } from '../../App';
import style from '../../assets/css/header.module.css';
import Modal from './Modal';

const Header = (props) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [state, dispatch] = useContext(store);
    const history = useHistory();
    const url = history.location.pathname;
    const classes = props.class ? style[props.class] : '';

    const openModal = () => {
        setModalOpen(true);
    };
    const closeModal = () => {
        setModalOpen(false);
    };
    const confirm = () => {
        // localStorage.removeItem("userName");
        localStorage.removeItem('money_list');
        // dispatch({ type: 'SET_USER_NAME', user_name: null });
        dispatch({ type: 'ADD_MONEY_IFNO', money_list: [] });
        setModalOpen(false);
        history.push('/');
    };
    const userEdit = () => {
        history.push('/user');
    };

    return (
        <header className={`${style.header} ${classes}`}>
            {url === '/add' ? (
                <>
                    <Link to={'/'} className={`${style.btn}`}>
                        <IoArrowBack />
                    </Link>
                    <h1>새로운 거래</h1>
                </>
            ) : (
                <>
                    <h1>Money book</h1>
                    <button onClick={openModal}>
                        {state.user_name && <HiOutlineTrash />}
                    </button>
                </>
            )}

            {state.user_name ? (
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
            ) : (
                <>
                    {url !== '/add' ? (
                        <Link to={'/user'} className={`${style.btn}`}>
                            <FiGrid />
                        </Link>
                    ) : (
                        <Modal
                            open={true}
                            confirm={userEdit}
                            icon={CgUserAdd}
                            header="등록된 사용자가 없습니다"
                            agree="이동하기"
                        >
                            내역을 입력하고 싶으시면 <br />
                            새로운 사용자를 입력해 주세요.
                        </Modal>
                    )}
                </>
            )}
        </header>
    );
};

export default Header;
