/**
 * {param} num
 * Function receives parameter num in centimeters and converts to Feet and inches.
 */
export default (num: number) => {
  const realFeet = (num * 0.3937) / 12;
  const feet = Math.floor(realFeet);
  const inches = (realFeet - feet) * 12;
  return `${feet} ft & ${inches.toFixed(2)} inches`;
};
