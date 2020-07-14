import React from 'react';
import * as Yup from 'yup';
import { Formik, FieldArray } from 'formik';

const Main = () => {

    const [price, setPrice] = React.useState("")
    const [yields, setYield] = React.useState("")

    const getMarketPrice = (cleanPrice) => {
        setPrice(cleanPrice)
        const yieldValue = cleanPrice * 2;
        setYield(yieldValue)
    }

    const getMarketYield = (yieldValue) => {
        setYield(yieldValue)
        const cleanValue = yieldValue / 2;
        setPrice(cleanValue)
    }

    const validationSchema = Yup.object({
        indicativeSize: Yup.string().required(' '),
        indicativeClean: Yup.string().required(' '),
        indicativeYield: Yup.string().required(' '),
        principal: Yup.string().required(' '),
    });
    
    const formFields = {
        indicativeSize: '',
        indicativeClean: '',
        indicativeYield: '',
        principal: '',
    };

    const onSubmit = (values) => {
    };

    return (
        <React.Fragment>
            <Formik initialValues={formFields} validationSchema={validationSchema} onSubmit={onSubmit}>
                {(actions) => (
                    <form actions={actions} >
                        <FieldArray name="fields"
                            render={() => {
                                return (
                                    <React.Fragment>
                                        <div className="input-group">
                                            <label>Indicative Size</label>						
                                            <input type="text" className="inputClass" name="indicativeSize" value={actions.values.indicativeSize} onChange={e => {
                                                actions.handleChange(e)
                                                actions.values.principal = actions.values.indicativeClean ? e.target.value * actions.values.indicativeClean : 0
                                            }} />
                                            <div className="error-message">Indicative Size is required.</div>
			                            </div>
                                        <div className="input-group">
                                            <label>Indicative Clean</label>						
                                            <input type="text" className="inputClass" name="indicativeClean" value={actions.values.indicativeClean} onChange={e => {
                                                actions.handleChange(e)
                                                getMarketPrice(e.target.value)
                                                actions.setFieldValue('indicativeYield', yields)
                                                actions.values.principal = actions.values.indicativeSize ? e.target.value * actions.values.indicativeSize : 0;
                                            }} />
                                            <div className="error-message">Indicative Clean is required.</div>
			                            </div>
                                        <div className="input-group">
                                            <label>Indicative Yield</label>						
                                            <input type="text" className="inputClass" name="indicativeYield" value={actions.values.indicativeYield} onChange={(e) => {
                                                actions.handleChange(e)
                                                getMarketYield(e.target.value)
                                                actions.setFieldValue('indicativeClean', price)
                                            }} />
                                            <div className="error-message">Indicative Yield is required.</div>
			                            </div>
                                        <div className="input-group">
                                            <label>Principle</label>						
                                            <input type="text" className="inputClass" name="principal" defaultValue={actions.values.principal} />
                                            <div className="error-message">Principle is required.</div>
			                            </div>
                                    </React.Fragment>
                                );
                            }}
                        />
                    </form>
                )}
            </Formik>
        </React.Fragment>
    )
}

export default Main;
