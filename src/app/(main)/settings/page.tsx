import { SettingsAccordion } from "@/components/accordion";
import { verifySession } from "@/dal";
import { getMerchant } from "./services";

const SettingsPage = async () => {
  const { token, merchantId } = await verifySession();
  const merchant = await getMerchant(token!, merchantId);

  return (
    <section>
      <div className="px-10 mb-10">
        <div className="pt-10">
          <SettingsAccordion token={String(token)} merchantId={merchantId} merchant={{businessName: merchant.businessName, merchantId: merchant.merchantId, businessEmail: merchant.businessEmail || '', photoUrl: merchant.photoUrl || ''}} />
        </div>
      </div>
    </section>
  )
}

export default SettingsPage;
