import Vec from 'victor';

/*
          <-----aperture------>
l_out_vec._===================_.r_out_vec -------------
          \\                 //             |         |
           \\       .center //              |.height  |
            \\             //               |         |
    l_in_vec.\\_=========_//.r_in_vec--------         |.out_rad
                                            |         |
                \       /                   |.in_rad  |
                                            |         |     
                  \   /                     |         | 
                    . vec_origin ---------------------
*/

export type ArcButtonFrame = {
  l_in_vec: Vec,
  r_in_vec: Vec,
  l_out_vec: Vec,
  r_out_vec: Vec,
  in_rad: number,
  out_rad: number,
  center: Vec,
};

export type ArcButtonConfigProps = {
  height: number,
  aperture: number,
  inRad: number,
  angle: number,
  gap: number,
};

export type ArcButtonSVGProps = {
  center: Vec,
  path: string,
  iconSize: number,
};

const up = '0 0 1';
const down = '1 0 0';


export function buildArcButton({ height, aperture, inRad, angle, gap }: ArcButtonConfigProps): ArcButtonSVGProps {
  const arcButtonConfig = calcArcButtonFrame(height, aperture, inRad, angle, gap);
  const path = frameToSVGPath(arcButtonConfig);
  const iconSize = calcIconSize(arcButtonConfig.center, aperture, height);
  return { center: arcButtonConfig.center, path, iconSize }
};

export function calcArcButtonFrame(
  height: number,
  aperture: number,
  in_rad: number,
  angle: number,
  gap: number,
): ArcButtonFrame{
  const half_ap = aperture/2;
  const in_vec = new Vec(0, in_rad);
  const out_vec = new Vec(0, in_rad).add(new Vec(0, height));
  const center = in_vec.clone().mix(out_vec, .5).rotateDeg(angle);

  return {
    in_rad: in_rad + gap * 1.05,
    out_rad: in_rad + height - gap*.95,
    l_in_vec: in_vec.clone().subtract(new Vec(gap, -gap)).rotateDeg(-half_ap + angle),
    r_in_vec: in_vec.clone().subtract(new Vec(-gap, -gap)).rotateDeg( half_ap + angle),
    l_out_vec: out_vec.clone().subtract(new Vec(gap, gap)).rotateDeg(-half_ap + angle),
    r_out_vec: out_vec.clone().subtract(new Vec(-gap, gap)).rotateDeg( half_ap + angle),
    center,
  };
}

export function frameToSVGPath({
  l_in_vec,
  r_in_vec,
  l_out_vec,
  r_out_vec,
  in_rad,
  out_rad,
}: ArcButtonFrame) {
  return `M${l_out_vec.x},${l_out_vec.y} 
          A${out_rad},${out_rad} ${up} ${r_out_vec.x},${r_out_vec.y}
          L${r_in_vec.x},${r_in_vec.y}
          A${in_rad},${in_rad} ${down} ${l_in_vec.x},${l_in_vec.y} 
          Z`; 
}

export function calcIconSize(center: Vec, aperture: number, height: number) {
  let w = center.clone().rotateDeg(aperture).subtract(center).length(), 
    h = height;
  return (w > h ? h : w ) * .9;
}