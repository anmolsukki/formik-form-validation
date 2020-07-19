import React from 'react';
import * as Yup from 'yup';
import { Formik, FieldArray } from 'formik';

const Main = () => {

    const initialValues = {
        indicativeSize: '',
        indicativeClean: '',
        principal: '',
    };

    const validationSchema = Yup.object({
        indicativeSize: Yup.string().required('Indicative Size is required.'),
        indicativeClean: Yup.string().required('Indicative Clean is required.'),
        principal: Yup.string().required('Principle is required.'),
    });

    const onSubmit = (values) => {
        alert(`IndicativeSize: ${values.indicativeSize} \n CleanPrice: ${values.indicativeClean} \n Principal: ${values.principal}`)
    };

    return (
        <React.Fragment>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                {(actions) => (
                    <form onSubmit={actions.handleSubmit}>
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
                                            <div className="error-message">{actions.errors?.indicativeSize}</div>
			                            </div>
                                        <div className="input-group">
                                            <label>Indicative Clean</label>						
                                            <input type="text" className="inputClass" name="indicativeClean" value={actions.values.indicativeClean} onChange={e => {
                                                actions.handleChange(e)
                                                actions.values.principal = actions.values.indicativeSize ? e.target.value * actions.values.indicativeSize : 0;
                                            }} />
                                            <div className="error-message">{actions.errors?.indicativeClean}</div>
			                            </div>
                                        <div className="input-group">
                                            <label>Principle</label>						
                                            <input type="text" className="inputClass" name="principal" defaultValue={actions.values.principal} />
                                            <div className="error-message">{actions.errors?.principal}</div>
			                            </div>
                                        <button type="submit" className="button"><span>Hover </span></button>
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

export default Main
