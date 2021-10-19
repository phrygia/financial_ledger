import React, { useEffect, useState, useContext } from 'react';
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
    const edit = state.edit_info ? state.edit_info : null; // 수정모드 체크
    const classes = props.class ? style[props.class] : '';

    useEffect(() => {
        // 수정모드가 아닐때 메인, 로그인 페이지에서 수정모드정보 삭제
        // 수정모드면 수정모드정보 유지
        if (window.performance) {
            if (performance.navigation.type === 1) {
                if (url !== '/pay' && state.edit_info !== null) {
                    localStorage.removeItem('edit_info');
                    dispatch({ type: 'EDIT_MONEY_IFNO', edit_info: null });
                }
            }
        }
    }, []);

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const confirm = () => {
        localStorage.removeItem('money_list');
        dispatch({ type: 'ADD_MONEY_IFNO', money_list: [] });
        setModalOpen(false);
        history.push('/');
    };

    const userEdit = () => {
        history.push('/user');
    };

    return (
        <header className={`${style['header']} ${classes}`}>
            {url === '/pay' ? (
                <>
                    <Link to={'/'} className={style['btn']}>
                        <IoArrowBack color="#fff" />
                    </Link>
                    <h1>{edit ? '거래 수정하기' : '거래 추가하기'}</h1>
                </>
            ) : (
                <>
                    <h1>Money book</h1>
                    <button onClick={openModal}>
                        {state.user_name && <HiOutlineTrash color="#323232" />}
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
                    header={`${state['user_name']} 사용자 삭제`}
                    agree="삭제하기"
                    editText="수정하기"
                >
                    삭제버튼을 누르시면 사용자의 전체 기록 및 <br />
                    정보가 삭제되고 복구 할 수 없습니다.
                </Modal>
            ) : (
                <>
                    {url !== '/pay' ? (
                        <Link to={'/user'} className={style['btn']}>
                            <FiGrid color="#323232" />
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
