Calculates all the extrema on a curve. Extrema are calculated for each dimension, rather than for the full curve, so that the result is not the number of convex/concave transitions, but the number of those transitions for each separate dimension.

This function yields an object <u>{x: [num, num, ...], y: [...], z: [...], values: [...]}</u> where each dimension lists the array of <u>t</u> values at which an extremum occurs, <u>z</u> exists only if the curve was a 3d curve, and the <u>values</u> property is the aggregate of the <u>t</u> values across all dimensions.</p>
