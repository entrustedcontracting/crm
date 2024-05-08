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
// 
import { createClient } from '@supabase/supabase-js'
import { v4 as uuidv4 } from "uuid";
// 
const supabaseUrl = 'https://tnjoxuevcrbolyxetddm.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

const AddNewTaskModal = ({ onClose }) => {
    const { columns, branches, tags, carriers, referralSources, referralSourceIndividuals, compJob, pDJob, vips, ifVips, accountManagers, confirmAddress, opportunityTypes, homeowners, gatedCommunities, propertyTypes, cols, zones, actions, createTask } = useBoards();
    const [branch, setBranch] = useState(branches[0].name);
    const [tag, setTag] = useState(tags[0].name);
    const [carrier, setCarrier] = useState(carriers[0].name);
    const [referralSource, setReferralSource] = useState(referralSources[0].name);
    const [referralSourceIndividual, setReferralSourceIndividual] = useState(referralSourceIndividuals[0].name);
    const [cJ, setCJ] = useState(compJob[0].name);
    const [pDJ, setPDJ] = useState(pDJob[0].name);
    const [v, setV] = useState(vips[0].name);
    const [vip, setVip] = useState(ifVips[0].name);
    const [accountManager, setAccountManager] = useState(accountManagers[0].name);
    const [confirmA, setConfirmAddress] = useState(confirmAddress[0].name);
    const [opportunityType, setOpportunityType] = useState(opportunityTypes[0].name);
    const [homeowner, setHomeowner] = useState(homeowners[0].name);
    const [gatedCommunity, setGatedCommunity] = useState(gatedCommunities[0].name);
    const [propertyType, setPropertyType] = useState(propertyTypes[0].name);
    const [col, setCol] = useState(cols[0].name);
    const [zone, setZone] = useState(zones[0].name);
    const [action, setAction] = useState(actions[0].name);
    const [status, setStatus] = useState(columns[0].name);

    const validate = Yup.object({
        // customer: Yup.string().required("Can't be empty"),
    })

    const postDispatch = (values) => {
        let supabaseObj = {
            "lead_id": uuidv4(),
            "carrier_name": values.carrier,
            "referral_source_name": values.referralSource,
            "referral_source_individual_name": values.referralSourceIndividual,
            "account_manager_name": values.accountManager,
            "customer_name": values.customer,
            "branch": values.branch,
            "is_comp_job": true ? values.cJ == 'Yes' : false,
            "is_partner_discount_job": true ? values.pDJ == 'Yes' : false,
            "is_vip": true ? values.v == 'Yes' : false,
            "why_vip": values.vip,
            "time_lead_came_in": values.timeLead,
            "is_address_confirmed": true ? values.confirmAddress == 'Yes' : false,
            "opportunity_type": values.opportunityType,
            "is_homeowner": true ? values.homeowner == 'Yes' : false,
            "is_gated_community": true ? values.gatedCommunity == 'Yes' : false,
            "gate_code": values.gateCode,
            "lock_box_code": values.loxBoxCode,
            "property_type": values.propertyType,
            "cause_of_loss": values.col,
            "cause_of_loss_details": values.colDetails,
            "inside_sales_special_instructions": values.specialInstructions,
            "zone": values.zone,
            "action_taken": values.action,
            "marketing_assistance_needed": values.marketingAssistance,
            "eta_requested": values.etaRequested,
            "on_call_damage_consultant_name": values.onCallDC
        };
        print(supabaseObj);
        // 

    }

    return (
        <Formik
            initialValues={{
                description: "",
                status: status,
                branch: branch,
                customer: ""
            }}
            validationSchema={validate}
            onSubmit={(values) => {
                console.log(values);
                console.log('test');
                createTask(values);
                // 
                postDispatch(values);
                onClose();
            }}
        >
            {formik => (
                <div className="w-full mx-auto rounded-md p-6 bg-white dark:bg-darkGrey md:p-8 scrollbar-thin scrollbar-thumb-mainPurple scrollbar-track-transparent overflow-y-scroll h-full pb-12 flex flex-col gap-5 column w-[280px] shrink-0 ">
                    <h1 className="heading-lg mb-6">Inside Sales Form</h1>
                    <Form>
                        <p className="heading-md mb-6">Referral Info</p>
                        <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
                        <Dropdown label={"Branch"} value={branch} values={branches} setValue={setBranch} />
                        {/* <TextInput label="Title" name="title" type="text" placeholder="e.g. Take coffee break"/> */}
                        {/* <TextArea label="Description" name="description" type="text" placeholder="e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little."/> */}
                        <Dropdown label={"Tag"} value={tag} values={tags} setValue={setTag} />
                        <Dropdown label={"Carrier"} value={carrier} values={carriers} setValue={setCarrier} />
                        <Dropdown label={"Referral Source"} value={referralSource} values={referralSources} setValue={setReferralSource} />
                        <Dropdown label={"Referral Source Individual"} value={referralSourceIndividual} values={referralSourceIndividuals} setValue={setReferralSourceIndividual} />
                        <Dropdown label={"Comp Job"} value={cJ} values={compJob} setValue={setCJ} />
                        <Dropdown label={"PD Job"} value={pDJ} values={pDJob} setValue={setPDJ} />
                        <Dropdown label={"VIP"} value={v} values={vips} setValue={setV} />
                        <Dropdown label={"If Yes to VIP"} value={vip} values={ifVips} setValue={setVip} />
                        <Dropdown label={"Account Manager"} value={accountManager} values={accountManagers} setValue={setAccountManager} />
                        <p className="heading-md mb-6 pt-10">Contact Info</p>
                        <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
                        <TextInput label="Customer" name="customer" type="text" placeholder="John Smith"/>
                        <TextInput label="Phone" name="phone" type="text" placeholder=""/>
                        <TextInput label="2nd Phone" name="secondPhone" type="text" placeholder=""/>
                        <TextInput label="Email" name="email" type="text" placeholder="johnsmith@email.com"/>
                        <TextInput label="Street Address" name="streetAddress" type="text" placeholder="123 Road"/>
                        <TextInput label="City" name="city" type="text" placeholder="City"/>
                        <TextInput label="Zip" name="zip" type="text" placeholder="12345"/>
                        <TextInput label="State" name="state" type="text" placeholder="Florida"/>
                        <TextInput label="Year Built" name="yearBuilt" type="text" placeholder="1999"/>
                        <Dropdown label={"Inside Sales Confirm Address"} value={confirmA} values={confirmAddress} setValue={setConfirmAddress}/>
                        <p className="heading-md mb-6 pt-10">Internal Info</p>
                        <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
                        <Dropdown label={"Opportunity Type"} value={opportunityType} values={opportunityTypes} setValue={setOpportunityType} />
                        <TextInput label="Time Lead Came In" name="timeLead" type="text" placeholder="7:00 am"/>
                        <Dropdown label={"Homeowner"} value={homeowner} values={homeowners} setValue={setHomeowner} />
                        <Dropdown label={"Gated Community"} value={gatedCommunity} values={gatedCommunities} setValue={setGatedCommunity} />
                        <TextInput label="Gate Code" name="gateCode" type="text" placeholder="1234"/>
                        <TextInput label="Lock Box Code" name="lockBoxCode" type="text" placeholder="1234"/>
                        <Dropdown label={"Property Type"} value={propertyType} values={propertyTypes} setValue={setPropertyType} />
                        <Dropdown label={"COL"} value={col} values={cols} setValue={setCol} />
                        <TextArea label="COL Details" name="colDetails" type="text" placeholder="Some details..."/>
                        <TextArea label="Inside Sales Special Instructions" name="specialInstructions" type="text" placeholder="Some instructions..."/>
                        <Dropdown label={"Zone"} value={zone} values={zones} setValue={setZone} />
                        <Dropdown label={"Action"} value={action} values={actions} setValue={setAction} />
                        <TextInput label="Marketing Assistance Needed" name="marketingAssistance" type="text" placeholder=""/>
                        {/* <InputArray label="subtasks" array={formik.values.subtasks} /> */}
                        <TextInput label="ETA Requested" name="etaRequested" type="text" placeholder="7:10 am"/>
                        <TextInput label="On Call DC" name="onCallDC" type="text" placeholder=""/>
                        {/* <StatusDropdown status={status} setStatus={setStatus} /> */}

                        <Button type="submit" className="mt-6 w-full bg-mainPurple text-white text-base rounded-full p-2 transition duration-200 hover:bg-mainPurpleHover">Submit New Lead</Button>
                    </Form>
                </div>
            )}

        </Formik>
    )
}
export default AddNewTaskModal
