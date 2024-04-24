import { Link } from "react-router-dom";

const Legal = () => {
    return (
        <div className='root'>
            <div className="legalPage">
                <div className="termsHeader">
                    <h1>Terms and Conditions</h1>
                    <h2>Your Guide to Participation, Privacy, and Responsibilities</h2>
                </div>
                <div className="dataUsage">
                    <h1>Data Usage Conditions:</h1>
                    <p>By participating in the BuyMore Dollars Match Game Contest, users consent to the collection and processing of personal information for contest-related purposes. This includes names, addresses, phone numbers, email addresses, and date of birth, solely for administering the contest. BuyMore Dollars may share necessary information with third-party service providers involved in contest logistics. Participants also agree to receive communications regarding contest updates and promotions but can opt out at any time. The collected data is handled securely, and participants have the right to access, correct, or request deletion of their personal information. Compliance with a minimum age of 16 is mandatory, and data will be retained for the contest's duration, adhering to outlined privacy conditions.</p>
                </div>
                <div className="ageRestrict">
                    <h1>Age Restriction:</h1>
                    <p>Participants must be at least 16 years of age to enter or play in the Match Game Contest hosted by BuyMore Dollars. Entry is strictly prohibited for individuals under the age of 16. By engaging in the contest, participants confirm that they meet the minimum age requirement or have obtained parental/guardian consent to participate. BuyMore Dollars reserves the right to disqualify any entrant found to be under the age of 16 without appropriate consent. Compliance with this age restriction is in accordance with applicable regulations and ensures a responsible and secure gaming environment.</p>
                </div>
                <div className="chanceOfWinning">
                    <h1>Chance of Winning and Prize Distribution:</h1>
                    <p>Winners of the BuyMore Dollars Match Game are determined through a fair random draw, providing equal chances for all participants. Prizes include 10,000 BuyMore Dollars, 5 prizes of 750 BuyMore Dollars, 10 prizes of 100 BuyMore Dollars, and 100 prizes of 20 BuyMore Dollars. The odds depend on the total entries received, with winners notified through provided contact information. Within 6 to 8 weeks of a win, prizes are distributed to the associated account. Non-winners receive a consolation message and a $2.00 off coupon for Raw-Cabbage-on-a-stick Hut. In case of discrepancies, the database prevails, ensuring accuracy in entries and prize distribution.</p>
                </div>
                <div className="optOut">
                    <h1>Opting Out of Communications:</h1>
                    <p>Participating in the Match Game Contest is your choice, and while you might receive contest-related updates, opting out is hassle-free. Use the provided unsubscribe links or follow SMS instructions for a quieter inbox. Opting out won't affect your contest eligibility, and you'll still get essential non-promotional communications. We swiftly confirm successful opt-outs, and you can change your mind and opt back in whenever you like. BuyMore Dollars respects your preferences, ensuring transparent and privacy-centric communication tailored to your choices.</p>
                </div>
            </div>
        </div>
    );
}
export default Legal;