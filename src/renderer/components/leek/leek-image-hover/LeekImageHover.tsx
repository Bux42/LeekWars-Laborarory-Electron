function LeekImageHover({ leek, height, width }: ILeekImageHoverProps) {
  return (
    <div style={{ height, width }}>
      <div
        style={leekImageStyles.image(
          getImage(`leekwars/image/leek/${leek.imageName ?? 'leek/1'}`),
        )}
      />
    </div>
  );
}

export default LeekImageHover;
