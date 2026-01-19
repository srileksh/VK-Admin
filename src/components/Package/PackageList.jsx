import PackageItem from "./PackageItem";

export default function PackageList({ packages, addSubPackage }) {
  return (
    <div className="space-y-5">
      {packages.map((pkg) => (
        <PackageItem
          key={pkg.id}
          pkg={pkg}
          addSubPackage={addSubPackage}
        />
      ))}
    </div>
  );
}
