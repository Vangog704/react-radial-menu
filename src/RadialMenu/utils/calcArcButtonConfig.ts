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

==================================================================
Path sequence: M l_out_vec -> A r_out_vec -> L r_in_vec -> A l_in_vec Z
==================================================================
*/

export type ArcButtonFrame = {
  l_in_vec: Vec | Vec[],
  r_in_vec: Vec | Vec[],
  l_out_vec: Vec | Vec[],
  r_out_vec: Vec | Vec[],
  in_rad?: number,
  out_rad?: number,
  center?: Vec,
};

export abstract class ArcButtonConfigProps {
  height: number;
  aperture: number;
  inRad: number;
  angle: number;
  gap: number;
  borderRadius: number;
};

export type ArcButtonSVGProps = {
  center: Vec,
  path: string,
  iconSize: number,
};

const up = '0 0 1';
const down = '1 0 0';

export class ArcButtonBuilder implements ArcButtonConfigProps {
  height = 100;
  aperture = 60;
  inRad = 100;
  angle = 0;
  gap = 2 - .3;
  borderRadius = 0;

  constructor({ height, aperture, inRad, angle, gap, borderRadius }: ArcButtonConfigProps) {
    this.height = height;
    this.aperture = aperture;
    this.inRad = inRad;
    this.angle = angle;
    this.gap = gap  - .3;
    this.borderRadius = borderRadius;
  }

  public build(): ArcButtonSVGProps {
    const arcButtonConfig = this.calcFrame();
    const path = this.frameToSVGPath(arcButtonConfig);
    const iconSize = this.calcIconSize(arcButtonConfig.center);
    return { center: arcButtonConfig.center, path, iconSize }
  };

  private calcFrame() {
    const { height, aperture, inRad, angle, gap, borderRadius } = this;

    const half_ap = aperture/2;
    const in_vec = new Vec(0, inRad);
    const out_vec = new Vec(0, inRad).add(new Vec(0, height));
    const center = in_vec.clone().mix(out_vec, .5).rotateDeg(angle);
    const frame = {
      l_in_vec: in_vec.clone().subtract(new Vec(gap, -gap)).rotateDeg(-half_ap + angle),
      r_in_vec: in_vec.clone().subtract(new Vec(-gap, -gap)).rotateDeg( half_ap + angle),
      l_out_vec: out_vec.clone().subtract(new Vec(gap, gap)).rotateDeg(-half_ap + angle),
      r_out_vec: out_vec.clone().subtract(new Vec(-gap, gap)).rotateDeg( half_ap + angle),
    };
    const roundedFrame = borderRadius > 0 ? this.calcArcRoundedCorner(frame) : frame;
    return {
      ...roundedFrame,
      in_rad: inRad + gap * 1.05,
      out_rad: inRad + height - gap*.99,
      center,
    };
  };

  private frameToSVGPath({
    l_in_vec,
    r_in_vec,
    l_out_vec,
    r_out_vec,
    in_rad,
    out_rad,
  }: ArcButtonFrame) {
    const { p_corner } = this;
    return `M${p_corner(l_out_vec)} 
            A${out_rad},${out_rad} ${up} ${p_corner(r_out_vec)}
            L${p_corner(r_in_vec)}
            A${in_rad},${in_rad} ${down} ${p_corner(l_in_vec)} 
            Z`; 
  };

  private p_corner(corner: Vec | Vec[]) {
    return Array.isArray(corner)
      ? `${corner[0].x},${corner[0].y}
        C${corner[1].x},${corner[1].y} ${corner[2].x},${corner[2].y} ${corner[3].x},${corner[3].y}`
      : `${corner.x},${corner.y}`
  }

  private calcIconSize(center: Vec) {
    const { aperture, height: h, gap } = this;
    let w = center.clone().rotateDeg(aperture).subtract(center).length();
    return ((w > h ? h : w ) - gap*2);
  };

  private calcArcRoundedCorner({
    l_in_vec,
    r_in_vec,
    l_out_vec,
    r_out_vec,
  }:any) {
    const { borderRadius } = this
    const r_c = 1 - .3
    const { height } = this;
    const br_hP = l_out_vec.length() / 100 * borderRadius / height * .6; // border radius _ height Percent
    const br_aA = l_out_vec.length() / 360 * borderRadius *.6; // border radius _ aperture Angle

    const l_br_a_in_vec  = l_in_vec.clone().rotateDeg(br_aA);
    const l_br_a_out_vec = l_out_vec.clone().rotateDeg(br_aA);
    const l_br_h_in_vec  = l_in_vec.clone().mix(l_out_vec, br_hP);
    const l_br_h_out_vec = l_out_vec.clone().mix(l_in_vec, br_hP);

    const r_br_a_in_vec  = r_in_vec.clone().rotateDeg(-br_aA);
    const r_br_a_out_vec = r_out_vec.clone().rotateDeg(-br_aA);
    const r_br_h_in_vec  = r_in_vec.clone().mix(r_out_vec, br_hP);
    const r_br_h_out_vec = r_out_vec.clone().mix(r_in_vec, br_hP);

    return {
      l_out_vec: [
        l_br_h_out_vec,
        l_br_h_out_vec.clone().mix(l_out_vec, r_c),
        l_br_a_out_vec.clone().mix(l_out_vec, r_c),
        l_br_a_out_vec,
      ],
      r_out_vec: [
        r_br_a_out_vec,
        r_br_a_out_vec.clone().mix(r_out_vec, r_c),
        r_br_h_out_vec.clone().mix(r_out_vec, r_c),
        r_br_h_out_vec,
      ],
      r_in_vec: [
        r_br_h_in_vec,
        r_br_h_in_vec.clone().mix(r_in_vec, r_c),
        r_br_a_in_vec.clone().mix(r_in_vec, r_c),
        r_br_a_in_vec,
      ],
      l_in_vec: [
        l_br_a_in_vec,
        l_br_a_in_vec.clone().mix(l_in_vec, r_c),
        l_br_h_in_vec.clone().mix(l_in_vec, r_c),
        l_br_h_in_vec,
      ],
    };
  };
};
