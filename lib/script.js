
/**
 * @param {org.acme.carchain.participant.transferOwnership } input -the sample transaction instance.
 * @transaction
 */
function updateOrder(input) {
  var serializer = getSerializer();
  return getAssetRegistry("org.acme.carchain.vehicleContactDetails")
    .then(function (assetRegistryOrder) {
      return assetRegistryOrder.get(input.vin);
    }).then(function (updateOrder) {
      contactDetails = {
        "$class": "org.acme.carchain.contactDetails",
        "customer_name": input.contactDetails.customer_name,
        "Phone": input.contactDetails.Phone,
        "emailId": input.contactDetails.emailId,
        "country": input.contactDetails.country,
        "state": input.contactDetails.state,
        "city": input.contactDetails.city,
        "street": input.contactDetails.street
      }
      updateOrder.contactDetails = serializer.fromJSON(contactDetails);
      return getAssetRegistry("org.acme.carchain.vehicleContactDetails")
        .then(function (assetRegistry) {
          assetRegistry.update(updateOrder);
        });
    });
}


async function assignOwnership(input) {
  var factory = getFactory();
  var serializer = getSerializer();
  var namespace = 'org.acme.carchain';

  try {

    /**
    * Participant Registry
    */
    let partRegistry = await getParticipantRegistry('org.acme.carchain.participant.EndUser');

    let enduser = await partRegistry.get(input.UID);


    if (!enduser.vinArray.includes(input.vin)) {

      enduser.vinArray.push(input.vin);

    }

    partRegistry.update(enduser);

    /**
    * Asset Registry
    */
    let assetRegistry = await getAssetRegistry('org.acme.carchain.vehicle');

    let indVehicle = await assetRegistry.get(input.vin);

    console.log(indVehicle)

    indVehicle.ownerID = input.UID;
    assetRegistry.update(indVehicle);
  } catch (e) {
    console.log('Error');
    throw e;
  }


}


/**
 * @param {org.acme.carchain.insuranceProvider } input -the sample transaction instance.
 * @transaction
 */
function addInsurance(input) {
  var factory = getFactory();
  var serializer = getSerializer();
  var namespace = 'org.acme.carchain';
  var insurance = factory.newResource(namespace, 'insuranceDetail', input.vin);

  insurance.CurrentInsuranceNumber = input.CurrentInsuranceNumber;
  insurance.CurrentInsuranceIssue = input.CurrentInsuranceIssue;
  insurance.CurrentInsuranceExpiry = input.CurrentInsuranceExpiry;
  insurance.PreviousInsuranceNumber = "";
  insurance.PreviousInsuranceIssue = new Date("2018-04-19T08:31:16.928Z");
  insurance.PreviousInsuranceExpiry = new Date("2018-04-19T08:31:16.928Z");
  return getAssetRegistry("org.acme.carchain.insuranceDetail")
    .then(function (assetRegistry) {
      return assetRegistry.add(insurance);

    });
}



/**
 * @param {org.acme.carchain.insuranceProviderUpdate } input -the sample transaction instance.
 * @transaction
 */
function updateInsurance(input) {

  var serializer = getSerializer();
  return getAssetRegistry("org.acme.carchain.insuranceDetail")
    .then(function (assetRegistryOrder) {
      return assetRegistryOrder.get(input.vin);
    }).then(function (insurance) {
      //var insurance = factory.newResource(namespace,'insuranceDetail',input.vin);
      insurance.PreviousInsuranceNumber = insurance.CurrentInsuranceNumber;
      insurance.PreviousInsuranceIssue = insurance.CurrentInsuranceIssue;
      insurance.PreviousInsuranceExpiry = insurance.CurrentInsuranceExpiry;
      insurance.CurrentInsuranceNumber = input.CurrentInsuranceNumber;
      insurance.CurrentInsuranceIssue = input.CurrentInsuranceIssue;
      insurance.CurrentInsuranceExpiry = input.CurrentInsuranceExpiry;

      //return getAssetRegistry("org.acme.carchain.insuranceDetail")

      //updateInsurance.insurance = serializer.fromJSON(insurance);
      return getAssetRegistry("org.acme.carchain.insuranceDetail")
        .then(function (assetRegistry) {
          assetRegistry.update(insurance);
        });
    });
}
