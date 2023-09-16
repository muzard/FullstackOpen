const Filter = ({ value, handler }) => {
  return (
    <div>
      filter shown with
      <input type="text" value={value} onChange={handler} />
    </div>
  );
};

export default Filter;
