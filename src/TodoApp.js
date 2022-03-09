import React, { useEffect, useState } from "react";
import { addDoc, collection, getDocs, deleteDoc, doc, setDoc } from "firebase/firestore";
import { db } from "./firebase-config";
import Modal from './Modal.js'



const TodoApp = () => {
	// get add input value
	const [val, setVal] = useState('');

	// map array return li
	const [data, setData] = useState([]);

	// get firebase value push array
	const arry = [];

	// set firebase item ids 
	const [ids, setIds] = useState();

	// modal bool value popup
	const [boolVal, setBoolVal] = useState(false);

	// confirm msg popup
	const [msgBool, setMsgBool] = useState(false);

	// input error message
	const [errorMsg, setErrorMsg] = useState('');

	// confirm message
	const [msg, setMsg] = useState('');



	const handleChane = (e) => {
		setVal(e.target.value);
	}

	// add data 
	const add = async (e) => {
		e.preventDefault();

		if (val === '') {
			setErrorMsg(`'empty input'`);

			setTimeout(() => {
				setErrorMsg('')
			}, 3000);

		} else {
			try {

				// add item 
				await addDoc(collection(db, 'list'), {
					val: val
				});
				// input empty
				setVal("");
				// confirm msg popup
				setMsgBool(true);
				// confirm msg
				setMsg('data store');
				// recall function 
				getTodo();

				// confirm msg popus hide after 2s
				setTimeout(() => {
					setMsgBool(false);
				}, 2000)

			}
			catch (error) {
				// confirm msg popup
				setMsgBool(true);
				// confirm msg
				setMsg(error.message);
				// confirm msg popus hide after 2s
				setTimeout(() => {
					setMsgBool(false);
				}, 2000)
			}
		}
	}

	// get data from firebase
	const getTodo = async () => {
		// get all data from firebase
		const getData = await getDocs(collection(db, 'list'));
		getData.forEach((doc) => {
			arry.push({ id: doc.id, value: doc.data().val });
		});
		setData(arry);
	}

	// i time render
	useEffect(() => {
		getTodo()
	}, [])

	// edit data
	const edit = (i) => {
		setIds(i);
		setBoolVal(true);
	}


	// remove data
	const remove = async (i) => {
		try {
			// remove item from firebase
			const removeItem = await deleteDoc(doc(db, 'list', i));
			// confirm msg popup
			setMsgBool(true);
			// confirm msg
			setMsg('Remove Item');
			// recall function 
			getTodo();
			// confirm msg popus hide after 2s
			setTimeout(() => {
				setMsgBool(false);
			}, 2000)
		}
		catch (error) {
			// confirm msg popup
			setMsgBool(true);
			// confirm msg
			setMsg(error.message);
			// confirm msg popus hide after 2s
			setTimeout(() => {
				setMsgBool(false);
			}, 2000);
		}

	}

	return (
		<>
			<section className="todo-section">
				<form onSubmit={add} className='todoform' >
					{/* add input */}
					<input type='text' placeholder="enter todo" maxLength={15} onChange={handleChane} value={val} />

					{/* add button */}
					<button type="submit" className="addBtn">Add</button>

					{/* add empty error */}
					<p>{errorMsg}</p>


					{/* list */}

					<ul>
						{data.map((v, i) => {
							return (
								<li key={i}>
									{v.value}
									<span>
										{/* edit button */}
										<button type="button" onClick={() => edit(v.id)}>Edit</button>
										{/* remove button */}
										<button type="button" onClick={() => remove(v.id)}>Delete</button>
									</span>
								</li>
							);
						})}
					</ul>

					{/* confirm message div */}
					{msgBool && <div className="confirm-msg">
						<p>
							{msg}
						</p>
					</div>}

					{/* modal div */}
					{boolVal && <Modal ids={ids} getTodo={getTodo} closeModal={setBoolVal} setMsg={setMsg} setMsgBool={setMsgBool} />}

				</form>
			</section>
		</>
	);
}


export default TodoApp;