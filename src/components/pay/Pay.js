import React from 'react';
import Header from '../common/Header';
import Calendar from './Calendar';
import style from '../../assets/css/pay.module.css';

function Pay() {
	return (
		<>
			<Header />
			<section className={`${style.pay_container}`}>
				<Calendar />
				<form>
					<ul>
						<li>
							<label>날짜</label>
							<div>
								<input value="" placeholder="년" />
								<input value="" placeholder="월" />
								<input value="" placeholder="일" />
							</div>
						</li>
						<li>
							<label>지출형태</label>
							<select>
								<option value="">식비</option>
								<option value="">쇼핑</option>
								<option value="">교통비</option>
								<option value="">커피</option>
								<option value="">데이트</option>
								<option value="">문화생활</option>
								<option value="">의류</option>
								<option value="">경조사</option>
								<option value="">자기계발</option>
								<option value="">운동</option>
							</select>
						</li>
						<li>
							<label>내용</label>
							<div>
								<input id="" type="radio" value="" />
								<label for=""></label>
								<input id="" type="radio" value="" />
								<label for=""></label>
							</div>
							<input placeholder="내용을 입력하세요 (예: 도서 구입)" />
						</li>
						<li>
							<label>금액</label>
							<input placeholder="금액을 입력하세요 (예: 18000)" />
						</li>
					</ul>
				</form>
				<button>입력하기</button>
			</section>
		</>
	);
}

export default Pay;
