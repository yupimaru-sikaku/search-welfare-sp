export const getAddress = async (zipcode) => {
  if (zipcode?.length === 7) {
    const res = await fetch(`https://api.zipaddress.net/?zipcode=${zipcode}`);
    const json = await res.json();
    if (json.code === 200) {
      return json.data.fullAddress;
    }
  }
};
