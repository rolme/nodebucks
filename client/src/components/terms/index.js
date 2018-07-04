import React, { Component } from 'react'

import './index.css'
import { Container, Row, Col } from 'reactstrap'

export default class Terms extends Component {
  componentDidMount() {
    // Reset to top of window.
    window.scrollTo(0, 0)
  }

  render() {
    return (
      <Container>
        <Col xl={{ size: 8, offset: 2 }} lg={{ size: 8, offset: 2 }} md={{ size: 10, offset: 1 }} sm={{ size: 12, offset: 0 }} className="mb-5">
          <Row className="pt-4 flex-column">
            <p className="termOfUseTitle"> Terms Of Use</p>
            <p className="paragraphText">The use of services provided by Nodebucks (hereafter referred to as "NB") is subject to the following Terms and Conditions</p>
          </Row>
          <Row className="pt-4 flex-column">
            <p className="termOfUseSectionTitle pb-2">Important Notice</p>
            <p className="paragraphText">Please email <a href="mailto:support@nodebucks.com">support@nodebucks.com</a> for all inquires.</p>
            <p className="paragraphText"><b>Party Definitions and Introductory Terms</b> - The operative parties referred to in this Agreement are defined as follows:</p>
            <ol>
              <li>
                <p className="paragraphText"> NB is the publisher and operator of www.nodebucks.com (the "Site") whereby NB makes certain Masternode services (the "Services") available. For purposes of this Agreement, when "Site" or "Services" are referenced, such reference includes all software and network resources necessary to provide said Site and/or Service.</p>
                <p className="paragraphText"> When first-person pronouns are used in this Agreement, (Us, We, Our, Ours, etc.) these provisions are referring to NB. Additionally, when the terms "the Site" or "Site" are used, these terms refer to any site published by Us, unless a site is specifically exempt from this policy.</p>
              </li>
              <li>
                <p className="paragraphText"><b>You, the Client</b> - As Our Client and the user of the Site or Services, this Agreement will refer to You through any second-person pronouns, such as "Your," "Yours," etc</p>
              </li>
            </ol>
            <p className="paragraphText text-uppercase">PLEASE READ THE FOLLOWING HOSTING SERVICES TERMS AND CONDITIONS. BY SUBSCRIBING TO NODEBUCKS’ SERVICES, YOU AGREE TO BE BOUND BY ALL THE TERMS AND CONDITIONS OF THIS AGREEMENT (the "AGREEMENT"). IF YOU AGREE WITH THE TERMS AND CONDITIONS OF THIS AGREEMENT, CLICK "I ACCEPT," (OR SIMILAR SYNTAX) OR CHECK THE APPROPRIATE BOX MANIFESTING YOUR INTENT TO BE BOUND BY THESE TERMS AND CONDITIONS AND CONTINUE WITH THE ACCOUNT SET-UP PROCESS. YOU
              SHOULD PRINT-OUT OR OTHERWISE SAVE A COPY OF THIS AGREEMENT FOR FUTURE REFERENCE. IF YOU DO NOT AGREE WITH ALL OF THE TERMS AND CONDITIONS OF THIS AGREEMENT, CLICK THE "BACK" BUTTON ON YOUR BROWSER AND DO NOT SUBSCRIBE TO NODEBUCKS’ SERVICES. NODEBUCKS AGREES TO PROVIDE SERVICES TO YOU ONLY IF YOU AGREE TO BE BOUND BY ALL OF THE TERMS AND CONDITIONS CONTAINED HEREIN. YOUR ELECTRONIC ACCEPTANCE OF THIS AGREEMENT IS PERMITTED BY THE ELECTRONIC SIGNATURES IN GLOBAL AND NATIONAL
              COMMERCE ACT (E-SIGN ACT) AND SIMILAR FEDERAL AND STATE LAWS. ANY USE OF VULTR'S SERVICES SHALL CONSTITUTE AN ACT OF ACCEPTANCE OF THE CURRENT HOSTING SERVICES TERMS AND CONDITIONS.</p>
          </Row>
          <Row className="pt-4 flex-column">
            <p className="termOfUseTitle pb-2">1. SERVICES</p>
            <p className="paragraphText">1.1 At the time of initial registration, You will select from the list of available Services to which You wish to subscribe. All subscriptions to Services are subject to formal acceptance by NB. Your subscription to the Services will be deemed accepted by NB when NB delivers a confirmation of the subscription to You. NB reserves the right to refuse to provide You with any Service for any reason. Notwithstanding Our Uptime Guarantee found in Section 17 of
              this Agreement, NB also reserves the right to interrupt access to the Services to perform regular and emergency maintenance as needed. You may order additional Services at any time, provided that You agree to pay the then-current fees for such additional Services. All additional Services shall be considered "Services" hereunder. All Services provided are subject to availability and to all of the terms and conditions of this Agreement.</p>
            <p className="termOfUseSectionTitle">More simply put:</p>
            <p className="paragraphText">We'll notify you right away once your services have been activated! </p>
            <p className="paragraphText">Unfortunately, we sometimes have to deny our services or interrupt them for maintenance. </p>
          </Row>
          <Row className="pt-4 flex-column">
            <p className="termOfUseTitle pb-2">2. REVISIONS TO USER AGREEMENT</p>
            <p className="paragraphText">This Agreement contains the complete and entire terms and conditions that apply to Your use of NB’s Services (as defined below). NB may modify the terms of this Agreement, including the Fees (as defined below) at any time.</p>
            <p className="paragraphText"><b>2.1</b> From time to time, We may revise this Agreement. We reserve the right to do so, and You agree that We have this unilateral right. You agree that all modifications or changes to this Agreement are in force and enforceable immediately upon posting. The updated or edited version supersedes any prior versions immediately upon posting, and the prior version is of no continuing legal effect unless the revised version specifically refers to the prior
              version
              and keeps the prior version or portions thereof in effect. To the extent any amendment of this Agreement is deemed ineffective or invalid by any court, the parties intend that the prior, effective version of this Agreement be considered valid and enforceable to the fullest extent.</p>
            <p className="paragraphText"><b>2.2</b> We agree that if We change anything in this Agreement, We will change the "last modified date" at the top of this Agreement. You agree to periodically re-visit this web page, and to use the "refresh" button on Your browser when doing so. You agree to note the date of the last revision to this Agreement. If the "last modified" date remains unchanged from the last time You reviewed this Agreement, then You may presume that nothing in the
              Agreement has
              been changed since the last time You read it. If the "last modified" date has changed, then You can be certain that something in the Agreement has been changed.</p>
            <p className="paragraphText"><b>2.3</b> Should You wish to terminate this Agreement due to any revisions made by Us, You must do so in writing via the cancellation form within thirty (30) days of the "last modified" date described above. Your continued use of the Services after the effective date of any such notice constitutes Your acceptance of such changes.</p>
            <p className="paragraphText"><b>2.4</b> Waiver – if You fail to periodically review this Agreement to determine if any of the terms have changed, You assume all responsibility for such omission and You agree that such failure amounts to Your affirmative waiver of Your right to review the amended terms. We are not responsible for Your neglect of Your legal rights.</p>
            <p className="termOfUseSectionTitle">More simply put:</p>
            <p className="paragraphText">Every so often, we have to update this agreement. Check the date at the top to see the last time it was revised.</p>
            <p className="paragraphText">Simply continue to use our services to show us that you accept the changes.</p>
          </Row>
          <Row className="pt-4 flex-column">
            <p className="termOfUseTitle pb-2">3. DURATION OF AGREEMENT AND CANCELLATION POLICY</p>
            <p className="paragraphText"><b>3.1</b> The Initial Term shall begin upon confirmation of Your order or commencement of the Services to You and receipt of lawful funds. The term's length is chosen by You and shall be indicated when You order Our Services. This Agreement may not be terminated by You during the Initial Term (and any renewals thereof) except in the event of a breach by NB. After the Initial Term, this Agreement shall automatically renew for successive terms, equal in
              length to the Initial Term, unless terminated or canceled by either party as provided herein.</p>
            <p className="paragraphText"><b>3.2</b> NB may also terminate this Agreement in its sole discretion at any time for any reason or no reason. ("Termination without Cause"). In such case, NB will provide You with thirty (30) days written notice before the discontinuation of Services.</p>
            <p className="paragraphText"><b>3.3</b> If NB cancels this Agreement pursuant to any of the terms outlined in this Agreement, with the exception of Termination without Cause pursuant to paragraph 3.2, NB shall not refund to You any fees paid or prepaid in advance of such cancellation and You shall be obligated to pay all fees and charges accrued prior to the effectiveness of such cancellation. In the event that NB terminates the Agreement for cause, all prepaid service fees will be
              forfeited and are not refundable. The termination of this Agreement does not relieve You of Your obligation to pay any Fees accrued or payable to NB prior to the effective date of termination of this Agreement.</p>
            <p className="paragraphText"><b>3.4</b> In addition to NB’s right to terminate this Agreement provided elsewhere in this Agreement, NB may terminate this Agreement effective immediately if, based on NB's sole judgment, it determines that You or any of Your end-users: (a) have breached the Acceptable Use Policy ("AUP") as described in Section 12 of this Agreement, and incorporated herein, (b) have infringed or violated any intellectual property right or privacy or publicity right of a
              third party, (c) have not complied with any applicable law, statute or regulation, or (d) have uploaded, published or disseminated any images, text, graphics, code or video which NB considers illegal or high risk, in its discretion. Nothing contained in this Agreement is intended to, or shall, impose any duty or obligation upon NB to monitor or review Your Content or the content of Your end-users at any time. You remain solely responsible for Your Content, and any liability
              generated therefrom.</p>
            <p className="paragraphText"><b>3.5</b> The termination of this Agreement will terminate Your access to the Services and Your license to the Host Materials (as defined in Section 5.2 of this Agreement). NB shall not be liable to You or to any third party for termination of the Services permitted under this agreement. Upon termination of this Agreement, NB reserves the right to maintain copies of Your data files and records for archival purposes, but does not undertake any obligation
              to do so. NB reserves the right to impose an early termination charge for all Services terminated prior to the last day of the billing cycle.</p>
            <p className="paragraphText"><b>3.6</b> If either party cancels or terminates this Agreement for any reason, You shall be solely responsible for making all necessary arrangements for securing a replacement host and moving all electronic data, graphics, images, video or text to the new service provider. Upon termination of this Agreement, provisions that by their nature would be expected to survive termination shall survive and remain in full force and effect in accordance with their
              terms.</p>
            <p className="termOfUseSectionTitle">More simply put:</p>
            <p className="paragraphText">We require that you keep your services running until after the initial term. NB reserves the right to cancel your services anytime, but we really don't want to! </p>
            <p className="paragraphText">Liabilities resulting from your content is your responsibility. If we have to cancel this agreement, it is up to you to move your content to another provider.</p>
          </Row>
          <Row className="pt-4 flex-column">
            <p className="termOfUseTitle pb-2">4. ACCOUNT SET UP</p>
            <p className="paragraphText"><b>4.1</b> When You register for the Services, You will choose a login (email) and password. You may use the Services or modify Your data and content only through such user ID and password. You are entirely responsible for maintaining the confidentiality of Your user ID and password and for any and all activities which occur using those credentials. You agree to immediately notify Us of any unauthorized use of Your account or any other breach of security
              known to You.</p>
            <p className="paragraphText"><b>4.2</b> You must provide Us with a primary email address that is checked regularly and frequently. All notices and communications between Us will be sent to the email address You provide, and You are therefore required to keep this address current or notify Us if Your address changes. You should notify Us if any of Your contact and/or billing information changes so that We may update Your account. It is also Your responsibility to make sure that Our
              domain(s), nodebucks.com, are not included in any spam block list used by You or Your mail provider.</p>
            <p className="paragraphText"><b>4.3</b> Providing false or inaccurate contact information of any kind may result in the Termination for Cause of Your account per Section 3 of this Agreement.</p>
            <p className="paragraphText"><b>4.4</b> You are responsible for all activity transpiring under Your account. We therefore highly recommend that You secure file, directory, and script permissions to the most restrictive settings possible. You agree that You have the technical ability to properly operate a web site and that You are responsible for any actions performed under Your account, including but not limited to, damage caused to Your site, NB's site and/or equipment, and any
              other site.</p>
            <p className="termOfUseSectionTitle">More simply put:</p>
            <p className="paragraphText">Keep your login credentials secure! </p>
            <p className="paragraphText">Please be sure to keep your email address updated too. We do most of our correspondence over email. </p>
            <p className="paragraphText">Also, be careful when giving out your account information. Any activity on your account is your responsibility. </p>
          </Row>
          <Row className="pt-4 flex-column">
            <p className="termOfUseTitle pb-2">5. INTELLECTUAL PROPERTY RIGHTS</p>
            <p className="paragraphText">All Services provided by NB may only be used for lawful purposes.</p>
            <p className="paragraphText"><b>5.1</b> As between You and NB, NB acknowledges that it claims no proprietary rights in or to the content (including without limitation, text, software, music, sound, audio visual works, motion pictures, photographs, animation, video and graphics) supplied by You for use on Your web site ("Your Content"). You hereby grant to NB a non-exclusive, worldwide and royalty-free license to copy, make derivative works, display, perform, use, broadcast and
              transmit on and via the Internet Your Content, solely for the benefit of You and to enable NB to perform its obligations here-under</p>
            <p className="paragraphText"><b>5.2</b> In connection with performance of the Services and at the sole discretion of NB, NB may (but is not obligated to) provide You with certain materials, including, without limitation, computer software (in object code or source code form), data, documentation or information developed or provided by NB or its suppliers under this Agreement, domain names, electronic mail addresses and other network addresses assigned to You, and other know-how,
              methodologies, equipment, and processes used by NB to provide You with the Services ("Host Materials"). Subject to the terms and conditions of this Agreement, NB hereby grants You a limited, revocable, non-transferable, non-exclusive license to use the Host Materials solely in connection with the Services. This license terminates when this Agreement terminates. As between You and NB, You acknowledge and agree that NB owns all right, title, and interest or otherwise has acquired all
              applicable licenses for the masternodes, and all copyright, trade secret, patent, trademark and other intellectual property rights therein. Any use of services after termination of this Agreement is not licensed and strictly prohibited. You agree that You will not upload, transmit, reproduce, distribute or in any way exploit any materials obtained through the Services without first obtaining the express written permission to do so from NB.</p>
            <p className="paragraphText"><b>5.3</b> This Agreement does not constitute a license to use NB's trade names, service marks or any other trade insignia. Any use of any of NB’s trade names, service marks or any other trade insignia is strictly prohibited, absent NB's prior written consent.</p>
            <p className="paragraphText"><b>5.4</b> If We are required to enlist the assistance of an Attorney or other person to collect any liquidated damages or any other amount of money from You, or if We are required to seek the assistance of an Attorney to pursue injunctive relief against You, or if We are required to file an ICANN complaint against You in order to bring about the transfer of an offending URL to Us from You, then You additionally agree that You will reimburse Us for all
              fees incurred in order to collect these liquidated damages, or in order to seek injunctive relief from You, or in order to file and prosecute an ICANN complaint.</p>
            <p className="paragraphText"><b>5.5</b> You understand that even a nominal amount of damages may require the expenditure of extensive legal fees, travel expenses, costs, and other amounts that may dwarf the liquidated damages themselves. You agree that You will pay all of these fees and costs.</p>
            <p className="termOfUseSectionTitle">More simply put:</p>
            <p className="paragraphText">All of your content belongs to you - not NB! You are simply granting NB permission to link your content to the internet. </p>
            <p className="paragraphText">If we end up providing you with any additional software, the terms of this agreement apply to it. </p>
            <p className="paragraphText">We hope that you love the NB service, but there are some legal boundaries when it comes to using our names and trademark. Reach out to us before doing so.</p>
            <p className="paragraphText">Misuse of our service can be costly to us. If misuse ends in damages, you may have to reimburse our legal fees. </p>
          </Row>
          <Row className="pt-4 flex-column">
            <p className="termOfUseTitle pb-2">6. DMCA Notice and Takedown Policy</p>
            <p className="paragraphText"><b>6.1</b> Introduction</p>
            <p className="paragraphText">Nodebucks.com ("NB") implements the following DMCA Notice and Takedown Policy. NB respects the intellectual property rights of third parties, and expects others to do the same. As part of our effort to recognize the copyrights of third parties, NB complies with the U.S. Digital Millennium Copyright Act ("DMCA") and is therefore protected by the limitations on liability recognized by 17 U.S.C. § 512; commonly known as the "safe harbor" provisions of the
              DMCA. NB's infringement notification procedure, counter-notification procedure, and takedown policies, are set forth below.</p>
            <p className="termOfUseSectionTitle">More simply put:</p>
            <p className="paragraphText">NB respects the intellectual property of third parties and complies with the US DMCA. Our DMCA policies are explained in the following sections.</p>
          </Row>
          <Row className="pt-4 flex-column">
            <p className="termOfUseTitle pb-2">7. Notice of Claimed Infringement</p>
            <p className="paragraphText"><b>7.1</b> Abuse Warning</p>
            <p className="paragraphText">The DMCA permits copyright owners, or their authorized agents, to submit notifications to service providers, such as NB, requesting that infringing material hosted on NB's servers be disabled or removed. Importantly, the DMCA imposes significant penalties – including court costs and attorneys fees – on those who abuse the infringement notification procedure, by misrepresenting either that material is infringing, or was removed by mistake. See; 17 U.S.C. §
              512(f). NB will pursue those who abuse its DMCA notice or counter-notification procedure, and will cooperate with law enforcement in any investigation of such abuse. Please make sure that you meet all the qualifications before submitting a DMCA notice to our Designated Agent identified below.</p>
            <p className="paragraphText"><b>7.2</b> Notification Contents and Procedure</p>
            <p className="paragraphText">If you believe that your work has been copied, reproduced, altered or published in a way that constitutes copyright infringement under federal law, or your copyrights have been otherwise violated, please submit a DMCA notice to NB's Designated Copyright Agent, containing the following:</p>
            <ol>
              <li>
                <p className="paragraphText">an electronic or physical signature of the person authorized to act on behalf of the owner of the copyright or other intellectual property interest;</p>
              </li>
              <li>
                <p className="paragraphText">a description of the copyrighted work or other intellectual property that you claim has been infringed;</p>
              </li>
              <li>
                <p className="paragraphText">a description of where the material that you claim is infringing is located on NB's servers (preferably including specific URL's associated with the material);</p>
              </li>
              <li>
                <p className="paragraphText">your full name, address, telephone number, and email address;</p>
              </li>
              <li>
                <p className="paragraphText">a statement by you that you have a good faith belief that the disputed use is not authorized by the copyright owner, its agent(s), or the law; and</p>
              </li>
              <li>
                <p className="paragraphText">a statement by you, made under penalty of perjury, that the above information in your Notice is accurate and that you are the copyright or intellectual property owner or authorized to act on the copyright or intellectual property owner's behalf.</p>
              </li>
            </ol>
            <p className="paragraphText">Claimants may send their Notice of Claimed Infringement to:</p>
            <address>
              Jay Severson, DMCA Agent<br/>
              San Jose, Ca 95124<br/>
              732-566-1268 (fax)<br/>
              <a href="mailto:dmca@nodebucks.com">dmca@nodebucks.com</a>
            </address>
            <p className="paragraphText">Please do not send other inquiries or information to our Designated Agent.</p>

            <p className="termOfUseSectionTitle">More simply put:</p>
            <p className="paragraphText">If your copyrighted work is being infringed by someone using the NB service, you may submit a DMCA notice to our DMCA agent.</p>
            <p className="paragraphText">You also agree that you won't abuse the DMCA claim process. Thank you for making this process smoother for our team.</p>
          </Row>
          <Row className="pt-4 flex-column">
            <p className="termOfUseTitle pb-2">8. Takedown Policies and Procedures</p>
            <p className="paragraphText">Vultr implements the following Takedown Policies and Procedures. Upon receipt of any notification of claimed copyright infringement, Vultr will act expeditiously to notify its customer of the alleged infringement, and take steps to disable or remove the subject material. DMCA Notices are generally processed within two (2) business days from receipt, absent extenuating circumstances. Vultr reserves the right at any time to disable access to, or remove any
              material or expressive work accessible on or from its servers or services, that is claimed to be infringing via a valid DMCA Notice, or based on facts or circumstances from which infringing activity is apparent. It is the firm policy of Vultr to terminate the account of repeat copyright infringers, when appropriate, and Vultr will act expeditiously to remove access to all material that infringes on another's copyright, according to the procedure set forth in 17 U.S.C. §512 of the
              DMCA. The procedure for notifying Vultr of claimed copyright infringement is set forth in Section 7.2, hereof. If the DMCA notice does not comply with §512 of the DMCA, but does substantially comply with the (3) three requirements for identifying infringing works according to §512 of the DMCA, Vultr shall attempt to contact or take other reasonable steps to reach the complaining party to assist that party comply with sending a complaint DMCA Notice. As noted above, when NB's
              Designated Agent receives a valid notice, Vultr will act expeditiously to remove and/or disable access to the infringing material and shall notify the affected customer or subscriber. Then, the affected customer or subscriber may submit a counter-notification to the Designated Agent, using the counter-notification procedures set forth below. Vultr reserves the right to modify, alter or add to this policy, and all affected persons should regularly check back to this page to stay
              current on any modifications.</p>
            <p className="termOfUseSectionTitle">More simply put:</p>
            <p className="paragraphText">Vultr will attempt to resolve DMCA claims as quickly as possible. Affected customers of the DMCA claim may submit a counter-notification to our DMCA agent.</p>
          </Row>
          <Row className="pt-4 flex-column">
            <p className="termOfUseTitle pb-2">9. Counter-Notification Procedures</p>
            <p className="paragraphText">If the Recipient of a Notice of Claimed Infringement ("Notice") believes that the Notice is erroneous or false, and/or that allegedly infringing material has been wrongly removed/disabled in accordance with the procedures outlined above in Section III above, the Recipient is permitted to submit a counter-notification pursuant to 17 U.S.C. § 512(g)(2) & (3). A counter-notification is the proper method for the Recipient to dispute the improper removal or
              disabling of material pursuant to a Notice. The information that a Recipient provides in a counter-notification must be accurate and truthful, and the Recipient will be liable for any misrepresentations contained in the counter-notification pursuant to 17 U.S.C. § 512(f).</p>
            <p className="paragraphText"> To initiate a counter-notification, the Recipient must submit to NB’s Designated Copyright Agent the following information:
              a specific description of the material that was removed or disabled pursuant to the Notice.
              a description of where the material was located within Vultr or the Content before such material was removed and/or disabled (preferably including specific URL's associated with the material.)
              a statement reflecting the Recipient's belief that the removal or disabling of the material was done so erroneously. For convenience, the following language may be utilized:
              "I swear, under penalty of perjury, that I have a good faith belief that the referenced material was removed or disabled by the service provider as a result of mistake or misidentification of the material to be removed or disabled."
              a statement that the Recipient consents to the jurisdiction of the Federal District Court in and for the judicial district where the Recipient is located, or if the Recipient is outside of the United States, for any judicial district in which the service provider may be found, and that the Recipient will accept service of process from the person who provided the Notice, or that person's agent.
              the Recipient's physical address, telephone number, and email address.
            </p>
            <p className="paragraphText">Counter Notifications can be sent to:</p>
            <address>
              Jay Severson, DMCA Agent<br/>
              San Jose, Ca 95124<br/>
              732-566-1268 (fax)<br/>
              <a href="mailto:dmca@nodebucks.com">dmca@nodebucks.com</a>
            </address>
            <p className="paragraphText">Please do not send other inquiries or information to our Designated Agent.</p>
            <p className="paragraphText">After receiving a DMCA-compliant counter-notification, Our Designated Copyright Agent will forward the counter-notification to the original claimant who first provided the Notice identifying the allegedly infringing material.</p>
            <p className="paragraphText">Within ten to fourteen (10-14) days from NB's receipt of a valid counter-notification, Vultr will replace or cease disabling access to the disputed material unless NB's Designated Agent receives notification that the original claimant has filed an action seeking a court order to restrain the Recipient from engaging in infringing activity relating to the material on NB's system or network.</p>
            <p className="termOfUseSectionTitle">More simply put:</p>
            <p className="paragraphText">If a DMCA claim sent to a customer is false, the affected customer may contact our DMCA agent with a counter-notification. Vultr will restore access within 10-14 days after receiving a counter-notification, unless the original claimant has filed a court order.</p>
          </Row>
          <Row className="pt-4 flex-column">
            <p className="termOfUseTitle pb-2">10. Service Provider Customers of NB</p>
            <p className="paragraphText">Some of NB's customers are, themselves, "Service Providers" within the meaning of 17 U.S.C. § 512(k)(1). Accordingly, NB requests that any DMCA Notices relating to alleged infringement by third party users, customers or subscribers of NB's Service Provider Customers be submitted directly to the DMCA Agent designated by such customer.</p>
            <p className="termOfUseSectionTitle">More simply put:</p>
            <p className="paragraphText">Some of NB's amazing customers are also service providers.</p>
            <p className="paragraphText">If you have a DMCA claim related to this type of service provider, we ask that you work with them first by sending the DMCA claim to their designated agent.</p>
          </Row>
          <Row className="pt-4 flex-column">
            <p className="termOfUseTitle pb-2">11. Modifications</p>
            <p className="paragraphText">NB reserves the right to modify, alter or add to the DMCA policy set forth in Sections 6-10 above, and all users should regularly check back regularly to stay current on any such changes.</p>
          </Row>
          <Row className="pt-4 flex-column">
            <p className="termOfUseTitle pb-2">12. CONTENT AND ACCEPTABLE USE POLICY</p>
            <p className="paragraphText"><b>12.1</b> You agree to comply with NB’s Acceptable Use Policy ("AUP"), which may be found by accessing NB's web site at http://www.nodebucks.com/legal/use_policy/, which policy is hereby incorporated by reference as an indispensable part of this Agreement. NB reserves the right to modify the AUP at any time by posting the modified policy on its web site. You agree to monitor the nodebucks.com home page for any changes to the AUP. Your continued use of
              the Services after the effective date of any changes to the AUP constitutes Your manifestation of intent to be bound by such changes. NB may, at its sole discretion, immediately terminate Your access to the Services, or this Agreement, if Your conduct violates the AUP, or if any of Your end users' conduct violates the AUP.</p>
            <p className="paragraphText"><b>12.2</b> NB will not actively monitor the content of the web sites being hosted by nodebucks.com, although nodebucks.com, at its sole discretion, may elect to electronically monitor its network and may disclose any content or records concerning Your account as necessary to satisfy any law, regulation, or other governmental request or to properly operate Our network and protect any of Our customers. NB will investigate complaints of a violation of a
              third party right or of the AUP. NB will cooperate with those attempting to minimize Internet abuse and reserves the right to institute "filters" or other mechanisms for that purpose. NB will cooperate with law enforcement authorities and reserves the right to notify such authorities if it suspects that You or any of Your end users are engaged in illegal activities. Nothing contained in this Section, or anywhere in this Agreement, is intended to bestow any rights on any third
              party, and no third parties shall be entitled to enforce any terms of this Agreement between the Parties.</p>
            <p className="paragraphText"><b>12.3</b> You acknowledge and expressly agree that NB will not be liable to You or any of Your end users for any action NB takes to remove or restrict access to the Services for any alleged violation of the AUP, or exercising its rights as a Good Samaritan under the Telecommunications Act of 1996 (47 U.S.C. § 230(d)) or under the Digital Millennium Copyright Act of 1998 (See Section 12.8 below).</p>
            <p className="paragraphText"><b>12.4</b> NB may, at its sole discretion, immediately terminate Your access to the Services, and terminate this Agreement for cause, if Your conduct violates the acceptable uses outlined below, or if any of Your end users' or downstream customers' conduct violate such acceptable uses.</p>
            <p className="paragraphText"><b>12.5</b> NB takes the issue of child pornography very seriously, and any potential harm to minors using our services is strictly prohibited. Content that is or may be perceived to be child pornography will be immediately removed from public access upon notification or detection by Us. Additionally, NB reserves the right to terminate any account whose website(s) hosts or links to child pornography immediately and without notice to You. If the account is
              a NB reseller account, the account will be suspended and the reseller will be directed to terminate the responsible account. You agree to cooperate in any such efforts. Content or communications seeking to solicit, lure or entice minors into sexual activity or lewd behavior is also strictly prohibited, and will be treated the same as, or similar to, child pornography, consistent with applicable law. You agree to cooperate with NB in any effort to investigate, disable or remove such
              content originating with Your end-users. Consistent with federal law, NB will cooperate with law enforcement authorities and will notify such authorities if it suspects that You or any of Your downstream customers or end users are engaged in any such illegal activities.</p>
            <p className="paragraphText"><b>12.6</b> In accordance with the reporting requirements of 18 U.S.C. § 2258A, We will report to the CyberTipline (www.cybertipline.com) any actual knowledge of apparent violations of 18 U.S.C §§ 2251, 2251A, 2252, 2252A, 2252B, 2260, or 1466A. If You suspect any instances of child pornography appearing on sites hosted by NB, We encourage You to send such reports to Our abuse address (abuse@nodebucks.com), and include the file name and/or URL (or other
              location on the customer's site), victim (if known), date of birth, date of production, and any other information about the suspect image(s). Do not send the image(s) in question. Alternately, You may use the CyberTipline to report suspected child pornography. Reports involving sites not hosted by NB should be directed to law enforcement or to a cooperating child pornography organization such as: https://www.asacp.org/index.php?content=report.</p>
            <p className="paragraphText"><b>12.7</b> We respect the intellectual property rights of all parties and have adopted a policy regarding termination of repeat copyright infringers under the Digital Millennium Copyright Act. Copies of Our Repeat Infringer Policy are available on request to our clients.</p>
            <p className="paragraphText"><b>12.8</b> Section 230 Notice: You acknowledge Your responsibility to prevent minors under Your care from accessing harmful or inappropriate material on Your site. You agree not to allow minors to view any such site, and agree to take responsible measures to prevent them from doing so. Numerous commercial online safety filters are available which may help users limit minors' access to harmful or inappropriate material. Pursuant to 47 U.S.C. §230(d), you
              are hereby informed that you can research such services at websites, such as www.asacp.org. Please note that this Site makes no representation or warranty regarding any of the products or services referenced on such sites, and recommend that the user conduct appropriate due diligence before purchasing or installing any online filter. You agree to take particular steps to prevent minors from viewing this site if Your computer can be accessed by a minor. Finally, You agree that if
              You are a parent or guardian of a minor child, it is Your responsibility, not Ours, to keep any age-restricted content on Our Site from being displayed or accessed by Your children or wards.</p>
            <p className="paragraphText">Pursuant to the Communications Decency Act ("CDA"), 47 U.S.C. § 230(c)(1), and court decisions interpreting the scope of the CDA, You acknowledge and understand that NB operates as the provider of an interactive computer service. Thus, We are immune from, and cannot be held responsible for, claims arising from the publication of Your content (including third-party content published on Your website(s)). We do not create such content, and We are not
              responsible for the publication of remarks or communications of You or third-parties that may arguably rise to the level of being actionable under federal or state laws including, but not limited to, the publication of material that might be considered defamatory, or violative of privacy or publicity rights. Note, that federal law allows Vultr to remove any content found to be offensive, defamatory, obscene or otherwise violative of Our policies, without impacting Our immunity
              status as an interactive computer service. Nothing contained in this paragraph is intended to limit or alter the immunity from claims provided by Section 230 of the Communications Decency Act. In the event that any court finds that any third party communication or third party content hosted by us falls outside of the realm of the immunity provided by the CDA, this shall not be deemed to be a waiver of any legal protections provided by Section 230 for any and all other content
              posted on our Website or hosted via our Services.</p>
            <p className="paragraphText"><b>12.9</b> Specific Requirements for Service Provider and User-Generated Content Subscribers</p>
            <p className="paragraphText">If You use Our Services for any site, sub-domain, page or business model that allows Your end users or customers to control or upload material to Internet space assigned to You by Us, You shall be deemed to be acting as a "Service Provider" with respect to such services and/or customers. Service Providers include but are not limited to Clients which; a) resell bandwidth as hosts to third parties; b) operate user-generated content sites such as forums,
              "tube" sites, review sites, and online classified advertising sites; c) operate search engines; or d) operate peer-to-peer file sharing networks. Clients acting as a Service Provider for third party users shall comply with the following provisions:</p>
            <p className="paragraphText">You shall notify Us of all domains, web pages or IP addresses for which You are acting as Service Provider.<br/> You shall comply with 17 U.S.C. §512 of the DMCA by properly designating an agent for receipt of copyright infringement notices, and You shall publish a link on the home page of any website for which You are a Service Provider to a DMCA Notice and Takedown Policy, identifying the website's designated agent and associated contact information.
              You shall provide Us with a current link to Your DMCA Notice and Takedown Policy and further advise Us of any changes to Your Designated Agent contact information. This shall be a continuing obligation for as long as You use Our Services.
              It is the policy of NB to provide any infringement notices it receives relating to Service Provider Subscribers, directly to the Subscriber's Designated DMCA Agent, and to further notify any copyright claimants of the identity and contact information for the Service Provider Subscriber's Designated DMCA Agent. Failure to maintain compliance with this section shall constitute a material breach of this Agreement. Nothing contained herein should be interpreted as legal advice, and You
              are encouraged to consult your personal attorney regarding DMCA safe harbor compliance, or any other legal matter.</p>
            <p className="paragraphText"><b>12.10</b> In keeping with Our DMCA policies and obligations set forth above, You understand, agree, and expressly allow Us to access and subsequently disable public access to any files or data residing on the server, disk, partition, or other data space under Your control as Our customer when such files or data, in Our discretion; 1), have been identified in a substantially compliant DMCA notice under 17 U.S.C. § 512; or 2) when We become aware of
              facts or circumstances indicating that such files or data are infringing on the copyrights or other intellectual property rights of third parties. Given that Our customers may employ various methods of securing files in conjunction with Our Services, and in an attempt to avoid material disruption of Our customers' Services, You agree that You will provide Us with Your preferred procedure for disabling access to material identified under this provision. If We forward You a
              substantially compliant DMCA Notice and which concerns content under Your control, You are obligated under this Agreement to immediately disable or remove access to such content. Irrespective of the above, We reserve the right to disable or remove access to such content, in Our discretion, and without claim of damage or injury by You. While We will attempt to simply disable access to such content without fully deleting it, or suspending all services to your account, We make no
              warranties concerning harm or injury to the content, and reserve the right to take any necessary actions to disable access to the identified material, including suspension or termination of Services. It is therefore in Your best interest to promptly respond to any DMCA Notices You may receive. Should You or Your website's users feel that such DMCA Notice was erroneously or improperly sent, You must follow the Counter-Notification procedure set forth above, and wait the required
              period of time, before We allow public access to the content to resume.</p>
            <p className="paragraphText"><b>12.11</b> Nothing contained in this Section, or any part of this Agreement, shall constitute legal or professional advice regarding any matter referenced therein. You are responsible for obtaining your own legal advice regarding compliance with any and all applicable laws or regulations.</p>
            <p className="termOfUseSectionTitle">More simply put:</p>
            <p className="paragraphText">You agree to comply to NB's Acceptable Use Policy (AUP). Please read this section carefully because we're trying to build a better, safer internet. </p>
            <p className="paragraphText">Illegal materials such as child pornography are strictly prohibited. We promptly remove this type of content and work with the authorities to keep minors out of harm.</p>
            <p className="paragraphText">We also require that you take care to protect minors from accessing harmful material on your websites.</p>
            <p className="paragraphText">You allow us to disable public access to your files or data when copyright infringement is brought to our attention.</p>
          </Row>
          <Row className="pt-4 flex-column">
            <p className="termOfUseTitle pb-2">13. ZERO TOLERANCE SPAM POLICY</p>
            <p className="paragraphText"><b>13.1</b> You agree to comply with NB's Anti-Spam Policy which may be found at http://www.nodebucks.com/legal/antispam_policy/ and which is hereby incorporated by reference as an indispensable part of this Agreement. Use of NB's services for any illegal spam activities is strictly prohibited.</p>
            <p className="paragraphText"><b>13.2</b> NB reserves the right to modify the Anti-Spam Policy at any time by posting the modified policy on its web Site. You agree to monitor NB's home page for any changes to the Anti-Spam Policy. Your continued use of the Services after the effective date of any changes to the Anti-Spam Policy constitutes Your manifestation of intent to be bound by such changes.</p>
            <p className="termOfUseSectionTitle">More simply put:</p>
            <p className="paragraphText">No one likes spam! You agree to comply to NB's Anti-Spam Policy.</p>
          </Row>
          <Row className="pt-4 flex-column">
            <p className="termOfUseTitle pb-2">14. PAYMENT</p>
            <p className="paragraphText"><b>14.1</b> Payment for Services is due in advance of the time period for which such payment covers. Services are billed on an automatic and recurring basis unless and until you follow NB's cancellation procedure set forth in this Agreement.</p>
            <p className="paragraphText"><b>14.2</b> Unless separately negotiated by You and Us, and confirmed by separate written agreement, the initial and recurring Fees for the Services selected by You shall be as provided in the initial on-line order form. All set-up fees and special programming fees are non-refundable. Fees for Services are payable in advance. Failure to make payment of Fees for Services when due may result in the suspension or termination of Services.</p>
            <p className="paragraphText"><b>14.3</b> At the time of registration, You must select a payment method. NB reserves the right to contract with a third party to process all payments. Such third party may impose additional terms and conditions governing payment processing. If You do not pay all Fees when due, Your account will be deemed past due. For any past due Fees, NB will charge You interest at one and one-half percent (1.5%) or the highest rate allowed by applicable law,
              whichever is lower, per month of the unpaid amount, until paid.</p>
            <p className="paragraphText"><b>14.4</b> You agree to pay any and all taxes, including personal property, value added, or sales taxes, resulting from Your use of the Services. NB is not responsible for any bank fees incurred by You due to Your use of check cards, automatic payment services, insufficient funds, and any and all other fees your financial institution may impose due to Your use of the Services. If NB should receive less than full payment of the Fees due to taxes, bank
              charges, transfer fees, or the like, NB will invoice You for the difference between payment received and the Fees due.</p>
            <p className="paragraphText"><b>14.5</b> You also agree to pay all attorney and collection fees arising from NB's efforts to collect any past due Fees. If you cancel any Service prior to the expiration of the pre-paid Fees, You understand and agree that NB will not issue You any refund whatsoever, including but not limited to any remaining pre-paid Fees, set up Fees, and/or special programming Fees.</p>
            <p className="paragraphText"><b>14.6</b> Coupons and Discount Codes – From time to time, NB may offer coupons or other discount codes which may be used when signing up for hosting with Us. Coupons and discount codes are for first-time customers of NB and must be used at the time of Your initial purchase with Us – they may not be applied after Your service with Us has already been initiated. Unless expressly provided, such coupons and discount codes may not be used toward upgrades to
              Your account. Any account We deem to be attempting unauthorized coupon or discount code use may be subject to Termination for Cause.</p>
            <p className="termOfUseSectionTitle">More simply put:</p>
            <p className="paragraphText">Fees for services are due in advance. It helps us keep our network running.</p>
            <p className="paragraphText">If you decide to stop paying for services, we have to suspend them. </p>
            <p className="paragraphText">Depending on where you are located, taxes may be applicable to our services. These will be included in the cost.</p>
            <p className="paragraphText">First-time customers can save money by using coupons!</p>
          </Row>
          <Row className="pt-4 flex-column">
            <p className="termOfUseTitle pb-2">15. BACK UPS & DATA LOSS</p>
            <p className="paragraphText"><b>15.1</b> You agree that Your use of NB's Services is at Your own risk, and that NB is not liable for any data loss in connection with its Services. You are solely responsible for creating backups of Your Content. If, during Our own routine maintenance, We do create a backup of Your Content which You later request Us to restore to Your account, We cannot guarantee that we will be able to do so, or that Your Content will be unharmed as a result of the
              initial data loss or the subsequent restore procedure. To that end, We highly recommend that You establish Your own routine backup procedure and that You periodically test restoring files from Your backup media to ensure that You are making viable backups.</p>
            <p className="paragraphText"><b>15.2</b> Should you wish for NB to provide you with routine backup service, in addition to the Services provided under this Agreement please contact Us. We offer many different backup solutions as an add-on service to Our regular Services, and all such services are provided through a separate, written agreement.</p>
            <p className="termOfUseSectionTitle">More simply put:</p>
            <p className="paragraphText">We do our best to protect your data! </p>
            <p className="paragraphText">Due to real world scenarios, like volcanoes and asteroids, there is always a small chance for data loss. </p>
            <p className="paragraphText">We recommend having a good backup plan for your projects.</p>
          </Row>
          <Row className="pt-4 flex-column">
            <p className="termOfUseTitle pb-2">16. RESOURCE USAGE & SECURITY</p>
            <p className="paragraphText"><b>16.1</b> NB does not impose hard set limits on each account's system resources. We do not actively disable accounts until they greatly exceed an acceptable level of usage. There are numerous activities that could cause such problems; these include: CGI scripts, FTP, PHP, HTTP, etc. NB will advise You of a temporary block placed on any account found to be consuming an inordinate amount of system resources, to the point of degrading overall system
              performance.</p>
            <p className="paragraphText"><b>16.2</b> Except where expressly permitted by law, You may not translate, reverse-engineer, decompile, disassemble, or make derivative works from the Site and/or Materials. You hereby agree not to use any automatic device or manual process to monitor or reproduce the Site or Materials, and will not use any device, software, computer code, or virus to interfere or attempt to disrupt or damage Our Services and Site or any communications on it. If You do
              not adhere to this provision of this Agreement, in addition to monetary damages and other remedies available to NB, You hereby agree to pay liquidated damages of $5000.00 plus any and all fees associated with recovery of these damages, including attorneys' fees and costs.</p>
            <p className="paragraphText"><b>16.3</b> SECURITY Any violation of the security to the Site and/or Services is prohibited and may result in criminal and civil liability. Unauthorized Access of the servers used to provide the Site, Services, and/or Materials (the "Servers") is strictly prohibited and is a violation of this Agreement and the AUP per Section 6 of this Agreement. You agree not to engage in such activity or to attempt to breach the Servers for the purpose of altering or
              manipulating the hardware and software, compromising the Servers, or for any other unauthorized use commonly known as "hacking." In addition, You are prohibited from the following:</p>
            <p className="paragraphText">Any form of unauthorized access to or use of data, systems or networks, including the Site and/or Services;
              <br/> Unauthorized monitoring of data or traffic on any network or system without express authorization of the owner of the system or network;
              <br/> Unauthorized interference with service to any user, host or network;
              <br/> Introducing a malicious program into the network or server (e.g. viruses and worms), including the Site and/or Services;
              <br/> Circumventing user authentication or security of any host, network or account;
              <br/>Using an account with another provider to promote Your site with Us in an abusive manner.
              <br/>Utilizing Our Services for the purpose of compromising the security or tampering with system resources or accounts on computers at Our site or any other site.
              <br/>In the event You are involved in any violation of system security, We reserve the right to release information about You to system administrators at other sites in order to assist in resolving security incidents, and We shall also cooperate with any law enforcement agency investigating a criminal violation of system or network security. Additionally, any violation of these security provisions may, at Our sole discretion, be grounds for Termination for Cause of Your account per
              Section 3 of this Agreement.
            </p>
            <p className="paragraphText"><b>16.4</b> FAIR USE POLICY We provide specific Services to our Clients and define normal, fair, and reasonable use in terms of our NB Virtual Private Servers as use that is consistent throughout any given billing period. We expect regular usage patterns from individual component machines and the client solution as a whole. Should we at our sole discretion determine a Client is not using this Service as defined under this Fair Use Policy, we may take
              actions to mitigate negative impact to Service delivery systems including but not limited to the following:</p>
            <p className="paragraphText">Rate-limit the data the Client may send and/or receive from the individual machine to the entire solution level
              <br/> Adjust pricing to a standard bandwidth rate (market-dependent)
              <br/> Suspend or terminate Service to any or all Client machines
            </p>
            <p className="termOfUseSectionTitle">More simply put:</p>
            <p className="paragraphText">Healthy systems are important. If you have too many processes going wild, we may have to block or rate-limit these services. </p>
            <p className="paragraphText">Our lawyers also wanted us to put in a clause where you agree to not to do anything hostile to NB. You probably know what that means; hacking, damaging, or reverse engineering our systems. </p>
            <p className="paragraphText">If you use too much bandwidth, we have to charge you for overages.</p>
          </Row>
          <Row className="pt-4 flex-column">
            <p className="termOfUseTitle pb-2">17. UPTIME GUARANTEE</p>
            <p className="paragraphText"><b>17.1</b> NB will offer You a Service Level Agreement ("SLA") guaranteeing certain availability of Our Services. If applicable, the terms of any such SLA were separately negotiated between You and Us, and such SLA, if any, is hereby incorporated by reference as an indispensable part of this Agreement.</p>
            <p className="paragraphText">To be eligible for any credits to Your account, You must follow the specific procedures set forth in the SLA for notifying Us of Your desire for credits. You understand and agree that the failure to follow the procedure in the SLA within three (3) days of the triggering event will result in Your waiver of any right to receive credits.</p>
            <p className="termOfUseSectionTitle">More simply put:</p>
            <p className="paragraphText">NB's uptime guarantee is defined in our SLA. You can submit an uptime claim within 3 days to be eligible for credit. </p>
          </Row>
          <Row className="pt-4 flex-column">
            <p className="termOfUseTitle pb-2">18. PRICE CHANGE</p>
            <p className="paragraphText">The amount You pay for hosting will never increase during a specific term or time period for which you have signed up for Our Services. We reserve the right to change prices listed on nodebucks.com at any time, without notice, and the right to modify the amount of resources given to plans at any time. Additionally, if we terminate this agreement without cause pursuant to paragraph 3.2 of the Agreement, You understand that if We agree to provide Services
              to You in the future, the amount You paid under any prior term or time period is not determinative of the amount You pay should We provide Services to You again. It is Your responsibility to check Our website for plan or price changes should You wish to take advantage of plan or price changes which may have occurred. NB does not automatically update Your plan. All upgrades or downgrades will be performed at Your request and may include modification fees or require reinitiating
              service with Us.</p>
            <p className="termOfUseSectionTitle">More simply put:</p>
            <p className="paragraphText">Your service costs will not change during a specific term. </p>
            <p className="paragraphText">Prices on the nodebucks.com website can change from time to time!</p>
          </Row>
          <Row className="pt-4 flex-column">
            <p className="termOfUseTitle pb-2">19. MONTHLY VERSUS HOURLY PRICING</p>
            <p className="paragraphText">Instance pricing is listed on our website in terms of US dollars per month. You may also choose to view pricing on an hourly basis which is displayed to 3 decimals of precision by default. To determine the hourly rate with higher precision, divide the monthly rate by 672 (24 hours per day in a 28-day month). If your instance is online for more than 672 hours, you will not be billed more than the monthly price. Below you can find the full pricing table for
              sample plans:</p>
            <table>
              <thead>
                <tr>
                  <th>Monthly Plan</th>
                  <th>Hourly Rate (3 decimals)</th>
                  <th>Hourly Rate (10 decimals)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>$2.50</td>
                  <td>$0.004</td>
                  <td>$0.0037202381</td>
                </tr>
                <tr>
                  <td>$5</td>
                  <td>$0.007</td>
                  <td>$0.0074404762</td>
                </tr>
                <tr>
                  <td>$10</td>
                  <td>$0.015</td>
                  <td>$0.0148809524</td>
                </tr>
                <tr>
                  <td>$20</td>
                  <td>$0.030</td>
                  <td>$0.0297619048</td>
                </tr>
                <tr>
                  <td>$40</td>
                  <td>$0.060</td>
                  <td>$0.0595238095</td>
                </tr>
                <tr>
                  <td>$80</td>
                  <td>$0.119</td>
                  <td>$0.1190476190</td>
                </tr>
                <tr>
                  <td>$160</td>
                  <td>$0.238</td>
                  <td>$0.2380952381</td>
                </tr>
                <tr>
                  <td>$320</td>
                  <td>$0.476</td>
                  <td>$0.4761904762</td>
                </tr>
                <tr>
                  <td>$640</td>
                  <td>$0.952</td>
                  <td>$0.95238095</td>
                </tr>
              </tbody>
            </table>
            <p className="termOfUseSectionTitle">More simply put:</p>
            <p className="paragraphText">Hourly rates are listed with only 3 decimal places on our website. </p>
            <p className="paragraphText">Exact hourly rates are calculated by dividing the monthly rate by 672.</p>
          </Row>
          <Row className="pt-4 flex-column">
            <p className="termOfUseTitle pb-2">20. INDEMNIFICATION</p>
            <p className="paragraphText">You agree to defend, indemnify, and hold NB and its Affiliates harmless from and against any and all claims and liabilities, including reasonable attorneys' and experts' fees, related to or arising from (a) any breach of Your covenants under this Agreement; (b) Your use of the Services; (c) any defamatory, libelous or illegal material contained within Your Content or Your information and data; (d) any claim or contention that Your Content or Your information and data infringes any third party's patent, copyright or other intellectual property rights or violates any third party's rights of privacy or publicity; (e) any third party's access or use of Your Content or Your information and data; (f) any violation of the applicable Acceptable Use Policy. In the event of a claim under this section, NB shall be permitted to select legal counsel to provide a defense to such claim. NB reserves the right, at its own expense, to participate in the defense of any matter otherwise subject to indemnification from You, but shall have no obligation to do so. You shall not settle any such claim or liability without the prior written consent of NB, which shall not be unreasonably withheld.</p>
            <p className="termOfUseSectionTitle">More simply put:</p>
            <p className="paragraphText">Should you break our agreement, you will hold NB and its affiliates harmless for liability. </p>
          </Row>
          <Row className="pt-4 flex-column">
            <p className="termOfUseTitle pb-2">21. NO WARRANTIES</p>
            <p className="paragraphText">YOU EXPRESSLY AGREE THAT YOUR USE OF THE SERVICES IS AT YOUR SOLE AND EXCLUSIVE RISK. THE SERVICES ARE PROVIDED ON AN "AS IS, WITH ALL FAULTS" AND "AS AVAILABLE" BASIS. NB EXPRESSLY DISCLAIMS ALL WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE AND NON-INFRINGEMENT. OTHER THAN AS SET FORTH IN PARAGRAPH 11, NB MAKES NO WARRANTY THAT THE SERVICES WILL MEET YOUR REQUIREMENTS, OR THAT THE SERVICES WILL BE UNINTERRUPTED, TIMELY, SECURE, OR ERROR FREE; NOR DOES NB MAKE ANY WARRANTY AS TO THE RESULTS THAT MAY BE OBTAINED FROM THE USE OF THE SERVICES OR AS TO THE ACCURACY OR RELIABILITY OF ANY INFORMATION OBTAINED THROUGH THE SERVICES OR THAT DEFECTS IN ANY SOFTWARE, HARDWARE OR THE SERVICES WILL BE CORRECTED. ANY STATEMENTS MADE REGARDING SUCH MATTERS IN PROMOTIONAL MATERIALS SHALL BE CONSIDERED ADVERTISING REFERENCES, AND NOT WARRANTIES. YOU UNDERSTAND AND AGREE THAT ANY USE YOU MAKE OF ANY MATERIAL AND/OR DATA DOWNLOADED OR OTHERWISE OBTAINED THROUGH THE USE OF THE SERVICES IS AT YOUR OWN DISCRETION AND RISK, AND THAT YOU WILL BE SOLELY RESPONSIBLE FOR ANY DAMAGE TO YOUR COMPUTER SYSTEM OR LOSS OF DATA THAT RESULTS FROM THE DOWNLOAD OF SUCH MATERIAL AND/OR DATA.</p>
            <p className="paragraphText">NB MAY MAKE THIRD-PARTY GOODS, SERVICES AND/OR SOFTWARE AVAILABLE TO YOU THAT ARE NOT PART OF THE SERVICES ("THIRD-PARTY SERVICES"). NB HAS NO CONTROL OVER THE CONTENT OF THIRD-PARTY SERVICES. USE OF ANY THIRD-PARTY SERVICES WILL BE AT YOUR OWN AND SOLE RISK AND SUBJECT TO THE TERMS AND CONDITIONS OF A SEPARATE AGREEMENT BETWEEN YOU AND THE THIRD-PARTY.</p>
            <p className="paragraphText">NO ADVICE OR INFORMATION, WHETHER ORAL OR WRITTEN, OBTAINED BY YOU FROM NB OR THROUGH THE SERVICES SHALL CREATE ANY WARRANTY, WHETHER BY IMPLICATION, ESTOPPEL OR OTHERWISE, INCLUDING BUT NOT LIMITED TO ANY MARKETING OR PROMOTIONAL MATERIALS DESCRIBING THE SERVICES ON NB'S WEBSITE.</p>
            <p className="paragraphText">UNLESS OTHERWISE AGREED TO IN WRITING, NB DOES NOT MAKE A BACK-UP OF YOUR SITE(S) AS PART OF THE SERVICES. ACCORDINGLY, WE ENCOURAGE YOU TO MAKE A BACK-UP OF YOUR SITE(S) ON A REGULAR BASIS.</p>
            <p className="termOfUseSectionTitle">More simply put:</p>
            <p className="paragraphText">We strive to provide you with the best possible service, but we cannot include a warranty.</p>
            <p className="paragraphText">Since we cannot be responsible for your data, we recommend having a good backup plan in place.</p>
          </Row>
          <Row className="pt-4 flex-column">
            <p className="termOfUseTitle pb-2">22. LIMITATION ON LIABILITY</p>
            <p className="paragraphText">YOU ARE SOLELY RESPONSIBLE FOR THE PROPER OPERATION OF YOUR WEB-SITE AND/OR CONDUCT OF YOUR BUSINESS AND ALL OTHER MATTERS UNDER YOUR CONTROL. IN NO EVENT SHALL NB BE LIABLE TO YOU FOR ANY DAMAGES ARISING FROM OR RELATED TO YOUR OPERATION OF YOUR WEB-SITE AND/OR BUSINESS OR FAILURE TO OPERATE YOUR WEB-SITE AND/OR BUSINESS.</p>
            <p className="paragraphText">THIS SECTION APPLIES TO ALL CLAIMS BY YOU OR YOUR END USERS IRRESPECTIVE OF THE CAUSE OF ACTION UNDERLYING THE CLAIM, INCLUDING, BUT NOT LIMITED TO, BREACH OF CONTRACT, TORT, INCLUDING BUT NOT LIMITED TO NEGLIGENCE, STRICT LIABILITY, FRAUD, AND/OR MISREPRESENTATION.</p>
            <p className="paragraphText">REGARDLESS OF THE TYPE OF CLAIM OR THE NATURE OF THE CAUSE OF ACTION, YOU AGREE THAT IN NO EVENT WILL NB, OUR AFFILIATES, CONTRACTORS, SERVICE PROVIDERS, EMPLOYEES, AGENTS, OR LICENSORS, OR ANY OTHER PARTY INVOLVED IN CREATING, PRODUCING OR DELIVERING THE SERVICES, TECHNOLOGY, OR CONTENT AVAILABLE ON THE SERVICES ("AFFILIATES"), BE LIABLE TO YOU IN ANY MANNER WHATSOEVER: (A) FOR ANY DECISION MADE OR ACTION OR NON-ACTION TAKEN BY YOU IN RELIANCE UPON THE INFORMATION PROVIDED THROUGH THE SERVICES; (B) FOR LOSS OR INACCURACY OF DATA OR, COST OF PROCUREMENT OF SUBSTITUTE GOODS, SERVICES OR TECHNOLOGY; (C) FOR ANY INDIRECT, SPECIAL, INCIDENTAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF REVENUES, LOSS OF PROFITS OR LOSS OF REPUTATION, FOR BUSINESS INTERRUPTION OR SIMILAR ACTION, EVEN IF NB HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.</p>
            <p className="paragraphText">THE TOTAL AGGREGATE AND MAXIMUM LIABILITY OF NB AND THE AFFILIATES, ARISING FROM OR OTHERWISE RELATING TO THIS AGREEMENT (REGARDLESS OF THE FORM OF ACTION OR CLAIM) IS LIMITED TO ANY AMOUNTS YOU HAVE PAID TO NB DURING THE SIX (6) MONTHS PRIOR TO THE ACCRUAL OF THE CAUSE OR CAUSES OF ACTION.</p>
            <p className="termOfUseSectionTitle">More simply put:</p>
            <p className="paragraphText">You agree that you will not hold NB liable for damages caused by the operations of your business or website.</p>
          </Row>
          <Row className="pt-4 flex-column">
            <p className="termOfUseTitle pb-2">23. GENERAL PROVISIONS</p>
            <p className="paragraphText"><b>23.1</b> Jurisdiction, Venue, and Choice of Law. This Agreement and all matters arising out of or otherwise relating to this Agreement shall be governed by the laws of the State of Florida, excluding its conflict of law provisions. The parties hereby submit to the personal jurisdiction of the state and federal courts of Orange County, Florida in the event litigation permitted under this Agreement is initiated. Exclusive venue for any litigation permitted under this Agreement shall be with the state and federal courts located in Orange County, Florida.</p>
            <p className="paragraphText">The parties agree that this choice of venue, jurisdiction, and forum as set out in the following parts of this Agreement is mandatory and not permissive in nature, thereby precluding any possibility of litigation between the parties with respect to, or arising out of, this Agreement in jurisdiction other than that specified in this Section.</p>
            <p className="paragraphText">All parties hereby waive any right to assert the doctrine of forum non-conveniens or similar doctrines, or to object to venue with respect to any proceeding brought in accordance with this paragraph or with respect to any dispute under this Agreement whatsoever.</p>
            <p className="paragraphText">Each party hereby authorizes and accepts service of process sufficient for personal jurisdiction in any action against it, as contemplated by this paragraph by registered or certified mail, Federal Express, proof of delivery or return receipt requested, to the parties address for the giving of notices as set forth in this Agreement.</p>
            <p className="paragraphText"><b>23.2</b> Arbitration. If there is a dispute between the parties arising out of or otherwise relating to this Agreement, the parties shall meet and negotiate in good faith to attempt to resolve the dispute. If the parties are unable to resolve the dispute through direct negotiations, then, except as otherwise provided herein, either party shall submit the issue to binding arbitration in accordance with the then-existing Commercial Arbitration Rules of the American Arbitration Association. Arbitral Claims shall include, but are not limited to, contract and tort claims of all kinds, and all claims based on any federal, state or local law, statute, or regulation, excepting only claims under applicable worker's compensation law, unemployment insurance claims, intellectual property claims, actions for injunctions, attachment, garnishment, and other equitable relief. The arbitration shall be conducted in Orange County, Florida and conducted by a single arbitrator, knowledgeable in Internet and e-Commerce. Except as provided below, the party bringing the action shall be responsible for paying all costs for arbitration, including the arbitrator's fees. Each party shall bear its own attorneys' fees (except if the matter is for the collection of a debt owed, the prevailing party shall be awarded its attorneys fees, all arbitration costs and arbitrator fees, in addition to all other applicable remedies). The arbitrator shall have no authority to award any punitive or exemplary damages; certify a class action; add any parties; vary or ignore the provisions of this Agreement, and shall be bound by governing and applicable law. The arbitrator shall be willing to execute an oath of neutrality. The arbitrator shall render a written opinion setting forth all material facts and the basis of his or her decision within thirty (30) days of the conclusion of the arbitration proceeding. THE PARTIES HEREBY WAIVE ANY RIGHTS THEY MAY HAVE TO TRIAL BY JURY IN REGARD TO ARBITRAL CLAIMS.</p>
            <p className="paragraphText"><b>23.3</b> Assignment. The rights and liabilities of the parties hereto will bind and inure to the benefit of their respective assignees, successors, executors, and administrators, as the case may be. Neither this Agreement nor any rights granted hereunder may be sold, leased, assigned or otherwise transferred, in whole or in part by You.</p>
            <p className="paragraphText"><b>23.4</b> Severability. If for any reason a court of competent jurisdiction or arbitrator finds any provision of this Agreement, or any portion thereof, to be unenforceable, that provision will be enforced to the maximum extent permissible and the remainder of this Agreement will continue in full force and effect.</p>
            <p className="paragraphText"><b>23.5</b> No Waiver. Failure by either party to enforce any provision of this Agreement will not be deemed a waiver of future enforcement of that or any other provision, and no waiver of one breach will constitute a waiver of subsequent breaches of the same or of a different nature.</p>
            <p className="paragraphText"><b>23.6</b> Complete Agreement. This Agreement (including all other policies incorporated herein) constitutes the entire agreement between the parties with respect to the Services, and supersedes and replaces all prior or contemporaneous understandings or agreements, written or oral, regarding such subject matter. No amendment to or modification of this Agreement will be binding unless in writing and signed by a duly authorized representative of both parties.</p>
            <p className="paragraphText"><b>23.7</b> Relationship Between the Parties. NB is an independent contractor; nothing in this Agreement shall be construed to create a partnership, joint venture or agency relationship between the parties.</p>
            <p className="paragraphText"><b>23.8</b> Non-Solicitation. Beginning upon commencement of the Services to You and continuing for a period of two (2) years after the termination of this Agreement or after any other cancellation or termination of Your account or Services with Us, You agree not to directly or indirectly, solicit, hire, contract, or otherwise employ any NB employee who was an employee during the term of this Agreement (including the Initial Term and any successive terms), to work for You or any other firm, person or business, of whatever character, corporate or otherwise.</p>
            <p className="paragraphText"><b>23.9</b> Headings. Section and subsection headings of this Agreement are inserted for convenience only and shall not be deemed to constitute a part hereof nor to affect the meaning thereof.</p>
            <p className="paragraphText"><b>23.10</b> Force Majeure. NB shall not be responsible for any failure to perform due to unforeseen circumstances or to causes beyond its reasonable control, including but not limited to: acts of God; war, riot, embargoes, acts of civil or military authority, or terrorism; fire, flood, earthquakes, hurricanes, tropical storms or other natural disasters; fiber cuts; strikes, or shortages in transportation, facilities, fuel, energy, labor or materials; failure of the telecommunications or information services infrastructure; hacking, SPAM, or any failure of a computer, server or software for so long as such event continues to delay NB's performance.</p>
            <p className="paragraphText"><b>23.11</b> Export. You understand and acknowledge that the software elements of the Host Materials may be subject to regulation by agencies of the U.S. Government, including the U.S. Department of Commerce, which prohibits export or diversion of software to certain countries and third parties. You will not assist or participate in any such diversion or other violation of applicable U.S. laws and regulations. You warrant that You will not license or otherwise permit anyone not approved to receive controlled commodities under applicable U.S. laws and regulations and that You will abide by such laws and regulations.</p>
            <p className="paragraphText"><b>23.12</b> Complaints – California Residents: The Complaint Assistance Unit of the Division of Consumer Services of the Department of Consumer Affairs may be contacted at: http://www.dca.ca.gov/online_services/complaints/consumer_complaint.shtml.</p>
            <p className="paragraphText"><b>23.13</b> Government Rights. The software elements of the Host Materials have been developed at private expense and are "commercial computer software" or "restricted computer software" within the meaning of the FARs, the DFARs, and any other similar regulations relating to government acquisition of computer software. Nothing contained herein will be deemed to: (i) grant any government agency any license or other rights greater than are mandated by statute or regulation for commercial computer software developed entirely at private expense, or (ii) restrict any government rights in any extensions or custom solutions provided hereunder and developed at government expense.</p>
            <p className="paragraphText"><b>23.14</b> Notices Electronic Communications. All notices permitted or required under this Agreement may be sent by e-mail, fax, express mail, mail, or registered mail to the e-mail address, fax number, or address most recently provided by You and will be effective upon transmission. Evidence of successful transmission shall be retained. Each of the parties may communicate with the other by electronic means as described in this Agreement. Each of the parties agrees to the following for all electronic communications: (i) The user identification of a sender, contained in an electronic communication, is legally sufficient to verify the sender's identity and the communication's authenticity; (ii) An electronic communication sent by You containing Your user identification establishes You as its originator and has the same effect as a document with Your written signature on it; and (iii) An electronic communication, or any computer printout of it, is valid proof of the validity of the original document of the electronic communication.</p>
            <p className="termOfUseSectionTitle">More simply put:</p>
            <p className="paragraphText">This section explains the laws and regulations applicable to this agreement.</p>
          </Row>
        </Col>
      </Container>
    )
  }
}
