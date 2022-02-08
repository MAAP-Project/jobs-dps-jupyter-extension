import React from 'react'
import { useState, useEffect } from 'react';
import { describeAlgorithms, getAlgorithms, getCMRCollections } from './handler';
import Select from 'react-select';
import { parseAlgoDesc, parseAlgoInputs, parseScienceKeywords } from './utils';
import { Button, Form } from 'react-bootstrap';
// import { BsInfoCircle } from 'react-icons/bs';
// import ReactTooltip from 'react-tooltip';

export const JobsSubmit = () => {

    const [algorithms, updateAlgorithms] = useState<any[]>([]);
    const [selectOption, updateSelectOption] = useState<any>({ "value": null, "label": null });
    const [publishToCMR, updatePublishToCMR] = useState<boolean>(false);
    const [selectOptionCMR, updateSelectOptionCMR] = useState<any>({ "value": null, "label": null });
    const [CMRCollections, updateCMRCollections] = useState<any>([]);

    /* States for selected algorithm data */
    const [algorithmInputFields, updateAlgorithmInputFields] = useState<any[]>([]);
    const [algorithmDesc, updateAlgorithmDesc] = useState<String>()

    useEffect(() => {

        /* Get list of available algorithms */
        getAlgorithms().then(res => {
            let algorithms: any[] = []
            res["response"]["algorithms"].forEach((item: any) => {
                let algorithm: any = {}
                algorithm["value"] = item["type"] + ':' + item["version"]
                algorithm["label"] = item["type"] + ':' + item["version"]
                algorithms.push(algorithm)
            });
            updateAlgorithms(algorithms)
        });

        /* Get selected algorithm metadata */
        describeAlgorithms(selectOption.value).then(res => {
            let body = res["response" as any]
            updateAlgorithmDesc(parseAlgoDesc(body))
            updateAlgorithmInputFields(parseAlgoInputs(body))
        });
    }, [selectOption])


    useEffect(() => {
        if (publishToCMR) {
            // Get list of available collections
            getCMRCollections().then(res => {
                let collections: any[] = []
                res["response"].forEach((item: any) => {
                    let collection: any = {}
                    collection["value"] = item["Collection"]["ShortName"]
                    collection["label"] = item["Collection"]["ShortName"]
                    collection["ShortName"] = item["Collection"]["ShortName"]
                    collection["ScienceKeywords"] = item["Collection"]["ScienceKeywords"]
                    collection["Description"] = item["Collection"]["Description"]
                    collection["concept-id"] = item["concept-id"]
                    console.log("Collection info:")
                    console.log(collection)
                    collections.push(collection)
                });
                updateCMRCollections(collections)
            });
        }
    }, [publishToCMR])


    const handleChange = (selectedOption: any) => {
        updateSelectOption(selectedOption)
    }


    const handleChangeCMR = (selectedOption: any) => {
        updateSelectOptionCMR(selectedOption)
    }

    const clearForm = () => {
        updateSelectOption({ "value": null, "label": null })
        updateSelectOptionCMR({ "value": null, "label": null })
        updateAlgorithmDesc("")
        updatePublishToCMR(false)
    }


    return (
        <Form className="job-submit-wrapper">
            <h2>Job Submission Form</h2>
            <hr />

            <div className="input-section-wrapper">
                <h4>1. Algorithm Selection</h4>
                <Select
                    options={algorithms}
                    value={{ value: selectOption.value, label: selectOption.label }}
                    onChange={handleChange}
                    placeholder="Select algorithm..."
                />
                <div className="algo-desc">
                    {algorithmDesc}
                </div>
            </div>
            {selectOption.value ? <div className="input-section-wrapper"><h4>2. General Information</h4><Form.Group className="mb-3 algo-input" controlId="tag">
                <Form.Label>Tag</Form.Label>
                <Form.Control type="text" placeholder={`Enter a tag to identify your job...`} />
            </Form.Group></div> : null}
            {selectOption.value ? <div className="input-section-wrapper"><h4>3. Input Data</h4><div className="input-wrapper">
                {algorithmInputFields.map((item, index) =>
                    <Form.Group className="mb-3 algo-input" controlId={`${item["ows:Title"]}_${index}`}>
                        <Form.Label>{item["ows:Title"]}</Form.Label>
                        <Form.Control type="text" placeholder={`Enter ${item["ows:Title"]}...`} />
                    </Form.Group>
                )}
            </div></div> : null}

            {selectOption.value ?
                <div className="input-section-wrapper">
                    <div className="cmr-input">
                        <h4>4. Publish to CMR?</h4>
                        <Form.Switch
                            custom
                            id="switchEnabled"
                            type="switch"
                            checked={publishToCMR}
                            onChange={() => updatePublishToCMR(publishToCMR => !publishToCMR)}
                        />
                    </div>
                    {publishToCMR ?
                        <div>
                            Select CMR Collection:
                            <Select
                                options={CMRCollections}
                                value={{ value: selectOptionCMR.value, label: selectOptionCMR.label }}
                                onChange={handleChangeCMR}
                                placeholder="Select collection..."
                                menuPlacement="auto"
                                className="cmr-select"
                            />
                            {console.log("debugging stuff")}
                            {console.log(selectOptionCMR)}
                            {selectOptionCMR.value ?
                                <table className="cmr-table">
                                    <tr>
                                        <td>Concept ID</td>
                                        <td>{selectOptionCMR["concept-id"]}</td>
                                    </tr>
                                    <tr>
                                        <td>Name</td>
                                        <td>{selectOptionCMR["ShortName"]}</td>
                                    </tr>
                                    <tr>
                                        <td>Description</td>
                                        <td>{selectOptionCMR["Description"]}</td>
                                    </tr>
                                    <tr>
                                        <td>Science Keywords</td>
                                        {parseScienceKeywords(selectOptionCMR["ScienceKeywords"]).map((item) => item + ", ")}
                                    </tr>
                                </table> : null}
                        </div> : null}
                </div> : null}
            <hr />
            <div className="form-button-bar">
                <Button>Submit Job</Button>
                <Button variant="outline-secondary" onClick={clearForm}>Clear</Button>
            </div>
        </Form>
    )
}
