import useSWR from "swr";

const fetcher = async (...args) => {
  const res = await fetch(...args);
  if (!res.ok) {
    throw new Error("エラーが発生したため、データの取得に失敗しました");
  }
  const json = await res.json();
  return json;
};

export function ServiceOffice({ officeId, officeName }) {
  const { data: serviceList, error } = useSWR(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/detail-service-office/?office=${officeId}`,
    fetcher
  );

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div className="m-5">
      {serviceList ? (
        serviceList.map((service, index) => (
          <div className="m-10" key={index}>
            <p className="text-white">{`${officeName}の提供サービス-${index + 1}`}</p>
            <ul>
              <li>{`事業所番号：${service.officeNumber}`}</li>
              <li>{`サービス種別：${service.serviceType}`}</li>
            </ul>
          </div>
        ))
      ) : (
        <p>事業所はありませんね</p>
      )}
    </div>
  );
}
