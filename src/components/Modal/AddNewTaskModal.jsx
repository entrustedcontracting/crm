import Button from "@components/shared/Button"
import { useBoards } from "@src/context";
import { Formik, Form, FieldArray } from "formik";
import * as Yup from 'yup';
import { useState } from "react";
import Dropdown from "@components/shared/Dropdown";
import StatusDropdown from "@components/shared/StatusDropdown";
import TextInput from "@components/shared/TextInput";
import TextArea from "@components/shared/TextArea";
import InputArray from "@components/shared/InputArray";

const AddNewTaskModal = ({onClose}) => {
    const { columns, branches, tags, carriers, referralSources, referralSourceIndividuals, vips, accountManagers, opportunityTypes, homeowners, gatedCommunities, propertyTypes, cols, zones, actions, createTask } = useBoards();
    const [branch, setBranch] = useState(branches[0].name);
    const [tag, setTag] = useState(tags[0].name);
    const [carrier, setCarrier] = useState(carriers[0].name);
    const [referralSource, setReferralSource] = useState(referralSources[0].name);
    const [referralSourceIndividual, setReferralSourceIndividual] = useState(referralSourceIndividuals[0].name);
    const [vip, setVip] = useState(vips[0].name);
    const [accountManager, setAccountManager] = useState(accountManagers[0].name);
    const [opportunityType, setOpportunityType] = useState(opportunityTypes[0].name);
    const [homeowner, setHomeowner] = useState(homeowners[0].name);
    const [gatedCommunity, setGatedCommunity] = useState(gatedCommunities[0].name);
    const [propertyType, setPropertyType] = useState(propertyTypes[0].name);
    const [col, setCol] = useState(cols[0].name);
    const [zone, setZone] = useState(zones[0].name);
    const [action, setAction] = useState(actions[0].name);
    const [status, setStatus] = useState(columns[0].name);

    const validate = Yup.object({
        title: Yup.string().required("Can't be empty"),
        subtasks: Yup.array().of(
            Yup.object({
                title : Yup.string().required("Can't be empty"),
            }),
        )

    })
    return (
        <Formik
            initialValues={{
                title: "",
                description: "",
                subtasks: ['', ''],
                status: status,
                branch: branch
            }}
            validationSchema={validate}
            onSubmit={ (values) => {
                console.log('test');
                values.status = status;
                values.branch = branch;
                createTask(values)
                onClose()
            }}
            >
            { formik => (
                    <div className="w-full mx-auto rounded-md p-6 bg-white dark:bg-darkGrey md:p-8">
                        <h1 className="heading-lg mb-6">Inside Sales Form</h1>
                    <Form>
                        <p className="heading-md mb-6">Referral Info</p>
                        <Dropdown label={"Branch"} value={branch} values={branches} setValue={setBranch} />
                        {/* <TextInput label="Title" name="title" type="text" placeholder="e.g. Take coffee break"/> */}
                        {/* <TextArea label="Description" name="description" type="text" placeholder="e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little."/> */}
                        <Dropdown label={"Tag"} value={tag} values={tags} setValue={setTag} />
                        <Dropdown label={"Carrier"} value={carrier} values={carriers} setValue={setCarrier} />
                        <Dropdown label={"Referral Source"} value={referralSource} values={referralSources} setValue={setReferralSource}/>
                        <Dropdown label={"Referral Source Individual"} value={referralSourceIndividual} values={referralSourceIndividuals} setValue={setReferralSourceIndividual} />
                        <Dropdown label={"If Yes to VIP"} value={vip} values={vips} setValue={setVip} />
                        <Dropdown label={"Account Manager"} value={accountManager} values={accountManagers} setValue={setAccountManager} />
                        <Dropdown label={"Opportunity Type"} value={opportunityType} values={opportunityTypes} setValue={setOpportunityType} />
                        <Dropdown label={"Homeowner"} value={homeowner} values={homeowners} setValue={setHomeowner} />
                        <Dropdown label={"Gated Community"} value={gatedCommunity} values={gatedCommunities} setValue={setGatedCommunity} />
                        <Dropdown label={"Property Type"} value={propertyType} values={propertyTypes} setValue={setPropertyType} />
                        <Dropdown label={"COL"} value={col} values={cols} setValue={setCol} />
                        <Dropdown label={"Zone"} value={zone} values={zones} setValue={setZone} />
                        <Dropdown label={"Action"} value={action} values={actions} setValue={setAction} />
                        <InputArray label="subtasks" array={formik.values.subtasks} />

                        <StatusDropdown status={status} setStatus={setStatus}/>

                        <Button type="submit" className="mt-6 w-full bg-mainPurple text-white text-base rounded-full p-2 transition duration-200 hover:bg-mainPurpleHover">+ Add New Task</Button>
                    </Form>
                </div>
            )}

        </Formik>
    )
}
export default AddNewTaskModal
