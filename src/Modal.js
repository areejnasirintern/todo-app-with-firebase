import React, { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "./firebase-config";



const Modal = ({ ids, getTodo, closeModal , setMsg, setMsgBool}) => {

	// get edit input value
	const [editVal, setEditVal] = useState('');
	// modal input error msg if it is empty
	const [modalError, setModalError] = useState('')


	const handleChange = (e) => {
		setEditVal(e.target.value);
	}


	// change value
	const change = async (e) => {
		e.preventDefault();

		if (editVal === '') {
			setModalError(`'empty input'`);

			setTimeout(() => {
				setModalError('')
			}, 3000);

		} else {
			try {
				// change value from firebase
				await setDoc(doc(db, "list", ids), {
					val: editVal
				});
				//edit input value empty
				setEditVal('');
				// confirm msg popup
				setMsgBool(true);
				// confirm msg
				setMsg('save');
				// modal close
				closeModal(false);
				// recall function
				getTodo();
				// confirm msg popus hide after 2s
				setTimeout(()=>{
					setMsgBool(false);
				}, 2000);

			}
			catch (error) {
				// confirm popup
				setMsgBool(true);
				// confirm msg
				setMsg(error.message);
				// confirm msg popus hide after 2s
				setTimeout(()=>{
					setMsgBool(false);
				}, 2000)
			}
		}


	}

	// back to home
	const back = () => {
		// modal close
		closeModal(false);
	}

	return (
		<>
			<section className="modal-section">
				<div className="Modal">
					<div>
						{/* edit input */}
						<input type='text' onChange={handleChange} placeholder='enter new value' maxLength={15} value={editVal} />
						{/* set edit value button */}
						<button type="button" onClick={change}>OK</button>
						{/* back to todolist button */}
						<button type="button" onClick={back} >X</button>
					</div>
					<p>{modalError}</p>

				</div>
			</section>
		</>
	);
}


export default Modal;