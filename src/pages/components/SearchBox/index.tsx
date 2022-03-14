export interface SearchBoxProps {
  onChange?: any;
}

const SearchBox = (props: SearchBoxProps) => {
  return (
    <div className="p-6">
      <input
        className="rounded-md h-14 w-80 bg-inherit border-2 border-slate-600 text-white"
        type="text"
        placeholder="Search for a character..."
        onChange={(event) => props.onChange(event.target.value)}
      />
    </div>
  );
};

export default SearchBox;
