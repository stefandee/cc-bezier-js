Finds the intersections between this curve an some line <u>{p1: {x:... ,y:...}, p2: ... }</u>. The intersections are an array of <u>t</u> values on this curve.

Curves are first aligned (translation/rotation) such that the curve's first coordinate is (0,0), and the curve is rotated so that the intersecting line coincides with the x-axis. Doing so turns "intersection finding" into plain "root finding".

As a root finding solution, the roots are computed symbolically for both quadratic and cubic curves, using the standard square root function which you might remember from high school, and the absolutely not standard Cardano's algorithm for solving the cubic root function.