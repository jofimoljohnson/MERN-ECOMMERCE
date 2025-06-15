import paypal from 'paypal-rest-sdk'

paypal.configure({
    mode:'sandbox',
    client_id:'AeCtzhrEsv_CN1SVCFFuwmTi92kk7HbEY8MgT4kjrOE5OEk08tjbcSOjCSiGG9MHtw2XH-IQC-vmRa6V',
    client_secret:'EKV-9ca0ECbqB62Iq2Wfbg_hol51Mpmge1tSCLHqnrEloFOvpLyPZzhuLpwTlLEAzoQE8kvJNZ3mRB9P'
})

export default paypal