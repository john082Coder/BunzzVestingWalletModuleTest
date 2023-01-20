import { Button, Col, Container, Row, Form, Spinner } from "react-bootstrap";
import React, { useState, useEffect, useCallback } from "react";

import useBunzz from '../hooks/useBunzz';

import {release, createVestingSchedule, connectToOhterContracts, getVestingWalletContract } from '../contracts/utils'
import { useWeb3React } from "@web3-react/core";
import BigNumber from 'bignumber.js';
import { bnToDec, isAddress } from "../utils";
import useReleasableAmount from "../hooks/useReleasableAmount";
import Table from 'react-bootstrap/Table';
const Creator = () => {
    const bunzz = useBunzz();
    const { account} = useWeb3React();
    const vestingWalletContract = getVestingWalletContract(bunzz);
    const [vestingTokenAddress, setVestingTokenAddress] = useState("");
    const [beneficiaryAddress, setBeneficiaryAddress] = useState("");
    const [startTimeStamp, setStartTimeStamp] = useState(0);
    const [durationSeconds, setDurationSeconds] = useState(0);

    const [pendingSetVestingToken, setPendingSetVestingToken] = useState(false);
    const [pendingCreateVestingSchedule, setPendingCreateVestingSchedule] = useState(false);
    const [pendingRelease, setPendingRelease] = useState(false);
    
  
    const releasableAmount = useReleasableAmount(vestingWalletContract);
   
 
   


    return (
        <Container>
            <Row className="justify-content-center mt-5">
                <Col lg="4" md="4" xs="12">
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Input Vesting Token Address</Form.Label>
                            <Form.Control type="email" placeholder="Enter Address" value={vestingTokenAddress} onChange={(val) => setVestingTokenAddress(val.target.value)} />
                            {!pendingSetVestingToken ?
                                <Button className="mx-3 mt-2" variant="dark" onClick={async () => {
                                    setPendingSetVestingToken(true);
                                try {
                                    let txHash;
                                    
                                    txHash = await connectToOhterContracts(
                                        vestingWalletContract,
                                        vestingTokenAddress,
                                        account,
                                    );
                                
                                    console.log(txHash);
                                    setPendingSetVestingToken(false);
                                    
                                } catch (e) {
                                    console.log(e);
                                    setPendingSetVestingToken(false);
                                    
                                }
                            }}>
                                SetVestingTokenAddress
                            </Button>
                            :
                            <Button className="mx-3 mt-2" variant="dark">
                                 <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                    />{` `} SetVestingTokenAddress
                            </Button>
                        }
                        <Form.Label>Input Beneficiary Address</Form.Label>
                        <Form.Control type="email" placeholder="Enter Address" value={beneficiaryAddress} onChange={(val) => setBeneficiaryAddress(val.target.value)} />

                        <Form.Label>Input StartTimeStamp</Form.Label>
                        <Form.Control type="email" placeholder="Enter Value" value={startTimeStamp} onChange={(val) => setStartTimeStamp(val.target.value)} />

                        <Form.Label>Input DurationSeconds</Form.Label>
                        <Form.Control type="email" placeholder="Enter Value" value={durationSeconds} onChange={(val) => setDurationSeconds(val.target.value)} />
                        {!pendingCreateVestingSchedule ?
                                <Button className="mx-3 mt-2" variant="dark" onClick={async () => {
                                    setPendingCreateVestingSchedule(true);
                                try {
                                    let txHash;
                                    
                                    txHash = await createVestingSchedule(
                                        vestingWalletContract,
                                        beneficiaryAddress,
                                        startTimeStamp,
                                        durationSeconds,
                                        true,
                                        account,
                                    );
                                
                                    console.log(txHash);
                                    setPendingCreateVestingSchedule(false);
                                    
                                } catch (e) {
                                    console.log(e);
                                    setPendingCreateVestingSchedule(false);
                                    
                                }
                            }}>
                                CreateVestingSchedule
                            </Button>
                            :
                            <Button className="mx-3 mt-2" variant="dark">
                                 <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                    />{` `} CreateVestingSchedule
                            </Button>
                        }

                        {!pendingRelease ?
                                <Button className="mx-3 mt-2" variant="dark" onClick={async () => {
                                    setPendingRelease(true);
                                try {
                                    let txHash;
                                    
                                    txHash = await release(
                                        vestingWalletContract,
                                        account,
                                    );
                                
                                    console.log(txHash);
                                    setPendingRelease(false);
                                    
                                } catch (e) {
                                    console.log(e);
                                    setPendingRelease(false);
                                    
                                }
                            }}>
                                Release
                            </Button>
                            :
                            <Button className="mx-3 mt-2" variant="dark">
                                 <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                    />{` `} Release
                            </Button>
                        }
                         
                           <div>Releasable Amount: {releasableAmount}</div>
                        </Form.Group>
                        
                     
                    </Form>
                   

                                    

         

                  
                </Col>
            </Row>
        </Container>
    )
}

export default Creator;