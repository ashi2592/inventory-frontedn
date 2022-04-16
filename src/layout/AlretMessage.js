import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AlertMessage = ({ alterMessageText }) => {


  useEffect(() => {

    if (alterMessageText.type == 'success') {
      toast.success(alterMessageText.message)
    }
    if (alterMessageText.type == 'error') {
      toast.error(alterMessageText.message)
    }

  }, [alterMessageText])
  return (
    <div>
      {/* <button onClick={notify}>Notify!</button> */}
      <ToastContainer
        position="top-center"
        autoClose={5000}
      />
    </div>
  )
}

const mapStateToProps = (state) => ({
  alterMessageText: state.intercomm.alterMessageText
})
const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(AlertMessage)